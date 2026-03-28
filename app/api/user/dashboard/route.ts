import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  problemProgress,
  mockExams,
  faculties,
  leaderboardScores,
  users,
  seasons,
  userAnalytics,
} from "@/drizzle/schema";
import { eq, sql, gt, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemsCount, getCategoryGroupsWithCounts } from "@/lib/problems";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;

  const [
    userRow,
    progressResult,
    solvedIdsResult,
    examHistoryResult,
    myScoreResult,
    seasonResult,
    facultyResult,
  ] = await Promise.all([
    // User info (streak, target faculties)
    db.select().from(users).where(eq(users.id, userId)).limit(1),

    // User progress by status
    db
      .select({
        status: problemProgress.status,
        count: sql<number>`count(*)`,
      })
      .from(problemProgress)
      .where(eq(problemProgress.userId, userId))
      .groupBy(problemProgress.status),

    // Solved IDs for category group counts
    db
      .select({ problemId: problemProgress.problemId })
      .from(problemProgress)
      .where(
        and(
          eq(problemProgress.userId, userId),
          eq(problemProgress.status, "solved")
        )
      ),

    // Exam history (last 5)
    db
      .select({
        id: mockExams.id,
        facultyId: mockExams.facultyId,
        facultyName: faculties.shortName,
        status: mockExams.status,
        scorePercent: mockExams.scorePercent,
        numCorrect: mockExams.numCorrect,
        numWrong: mockExams.numWrong,
        numBlank: mockExams.numBlank,
        startedAt: mockExams.startedAt,
      })
      .from(mockExams)
      .innerJoin(faculties, eq(mockExams.facultyId, faculties.id))
      .where(and(eq(mockExams.userId, userId), eq(mockExams.status, "completed")))
      .orderBy(desc(mockExams.startedAt))
      .limit(5),

    // Leaderboard score
    db
      .select()
      .from(leaderboardScores)
      .where(eq(leaderboardScores.userId, userId))
      .limit(1),

    // Active season
    db.select().from(seasons).where(eq(seasons.isActive, true)).limit(1),

    // Faculty info (for exam dates)
    db.select().from(faculties),
  ]);

  // Calculate rank
  let rank: number | null = null;
  if (myScoreResult.length > 0) {
    const rankResult = await db
      .select({ count: sql<number>`count(*) + 1` })
      .from(leaderboardScores)
      .where(gt(leaderboardScores.totalScore, myScoreResult[0].totalScore));
    rank = Number(rankResult[0]?.count ?? 1);
  }

  // Total leaderboard participants
  const totalParticipants = await db
    .select({ count: sql<number>`count(*)` })
    .from(leaderboardScores);

  // Aggregate progress
  const total = getProblemsCount();
  const byStatus: Record<string, number> = {};
  for (const row of progressResult) {
    byStatus[row.status] = Number(row.count);
  }
  const solved = byStatus.solved ?? 0;

  // Today's progress (problems solved today)
  const todayResult = await db.execute(sql`
    SELECT COUNT(*) as count
    FROM problem_progress
    WHERE user_id = ${userId}
      AND status = 'solved'
      AND solved_at >= CURRENT_DATE
  `);
  const solvedToday = Number((todayResult.rows[0] as any)?.count ?? 0);

  const user = userRow[0];
  const targetFaculties = (user?.targetFaculties as string[]) || [];

  // Build faculty exam dates for user's target faculties
  const facultyExamDates = facultyResult
    .filter((f) => targetFaculties.includes(f.id))
    .map((f) => ({
      id: f.id,
      name: f.name,
      shortName: f.shortName,
      examDate: f.examDate,
    }));

  // Calculate countdown to earliest exam
  let countdownTarget: string | null = null;
  if (seasonResult.length > 0) {
    countdownTarget = seasonResult[0].examPeriodStart;
  }
  // If user has target faculties with exam dates, use the earliest one
  const facultyDates = facultyExamDates
    .filter((f) => f.examDate)
    .map((f) => new Date(f.examDate!).getTime());
  if (facultyDates.length > 0) {
    const earliest = new Date(Math.min(...facultyDates));
    countdownTarget = earliest.toISOString().split("T")[0];
  }

  // Last completed exam
  const lastExam =
    examHistoryResult.length > 0
      ? {
          scorePercent: examHistoryResult[0].scorePercent,
          facultyName: examHistoryResult[0].facultyName,
          startedAt: examHistoryResult[0].startedAt,
        }
      : null;

  // Category groups with solved counts
  const solvedIds = new Set(solvedIdsResult.map((r) => r.problemId));
  const categoryGroupsRaw = getCategoryGroupsWithCounts(solvedIds);

  // Fetch accuracy + readiness data from analytics
  const analyticsRows = await db
    .select({
      categoryBreakdown: userAnalytics.categoryBreakdown,
      readinessScore: userAnalytics.readinessScore,
      readinessBreakdown: userAnalytics.readinessBreakdown,
    })
    .from(userAnalytics)
    .where(eq(userAnalytics.userId, userId))
    .limit(1);
  const breakdown = (analyticsRows[0]?.categoryBreakdown as Record<string, any>) || {};

  // Recompute inactivity penalty at read time
  const storedBreakdown = analyticsRows[0]?.readinessBreakdown as any;
  let readinessScore = Number(analyticsRows[0]?.readinessScore ?? 0);
  if (storedBreakdown?.rawScore != null && user?.lastActiveDate) {
    const lastActive = new Date(user.lastActiveDate);
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const lastDate = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    const daysInactive = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    const freshPenalty = Math.min(20, Math.max(0, (daysInactive - 2) * 2));
    readinessScore = Math.max(0, Math.round(storedBreakdown.rawScore - freshPenalty));
  }

  // Merge accuracy + readiness into category groups
  const groupScores = storedBreakdown?.groupScores ?? {};
  const categoryGroups = categoryGroupsRaw.map((group) => {
    const gs = groupScores[group.id];
    return {
      ...group,
      categories: group.categories.map((cat) => {
        const acc = breakdown[cat.id];
        return {
          ...cat,
          percent: acc?.percent ?? 0,
          correct: acc?.correct ?? 0,
          attempted: acc?.total ?? 0,
          readinessScore: Math.round(gs?.subcategories?.[cat.id]?.score ?? 0),
        };
      }),
      percent: (() => {
        const percents = group.categories.map((c) => breakdown[c.id]?.percent ?? 0);
        return Math.round(percents.reduce((s, p) => s + p, 0) / percents.length);
      })(),
      readinessScore: Math.round(gs?.score ?? 0),
    };
  });

  return NextResponse.json({
    user: {
      displayName: user?.displayName ?? "Korisnik",
      avatarUrl: user?.avatarUrl,
      streakCurrent: user?.streakCurrent ?? 0,
      streakBest: user?.streakBest ?? 0,
      targetFaculties,
    },
    progress: {
      total,
      solved,
      dailyGoal: user?.dailyGoal ?? 3,
      solvedToday,
    },
    lastExam,
    countdown: countdownTarget,
    categoryGroups,
    rank: {
      position: rank,
      totalParticipants: Number(totalParticipants[0]?.count ?? 0),
      totalScore: myScoreResult[0]?.totalScore ?? "0",
      problemsSolved: myScoreResult[0]?.problemsSolved ?? 0,
      avgScore: myScoreResult[0]?.avgExamPercent ?? "0",
    },
    readinessScore,
    facultyExamDates,
    season: seasonResult[0] ?? null,
  });
}
