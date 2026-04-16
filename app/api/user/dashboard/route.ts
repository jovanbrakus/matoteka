import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  problemProgress,
  mockExams,
  faculties,
} from "@/drizzle/schema";
import { eq, sql, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemsCount, getCategoryGroupsWithCounts } from "@/lib/problems";
import { generateRecommendations } from "@/lib/recommendations";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const [
    userWithAnalytics,
    progressResult,
    solvedIdsResult,
    examHistoryResult,
    leaderboardResult,
    facultyResult,
    todayResult,
  ] = await Promise.all([
    // User info + analytics in one query
    db.execute(sql`
      SELECT u.*, ua.category_breakdown, ua.readiness_score, ua.readiness_breakdown
      FROM users u
      LEFT JOIN user_analytics ua ON ua.user_id = u.id
      WHERE u.id = ${userId}
      LIMIT 1
    `),

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

    // Exam history (last 5 for lastExam + recent 3 for table)
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
        timeSpent: mockExams.timeSpent,
        durationLimit: mockExams.durationLimit,
        testSize: mockExams.testSize,
        startedAt: mockExams.startedAt,
      })
      .from(mockExams)
      .innerJoin(faculties, eq(mockExams.facultyId, faculties.id))
      .where(and(eq(mockExams.userId, userId), eq(mockExams.status, "completed")))
      .orderBy(desc(mockExams.startedAt))
      .limit(5),

    // Leaderboard: score + rank + total participants in one query
    db.execute(sql`
      SELECT total_score, problems_solved, avg_exam_percent, rank, total_participants
      FROM (
        SELECT user_id, total_score, problems_solved, avg_exam_percent,
          RANK() OVER (ORDER BY total_score DESC) as rank,
          COUNT(*) OVER () as total_participants
        FROM leaderboard_scores
      ) ranked
      WHERE user_id = ${userId}
    `),

    // Faculty info (for exam dates)
    db.select().from(faculties),

    // Today's progress (problems solved today)
    db.execute(sql`
      SELECT COUNT(*) as count
      FROM problem_progress
      WHERE user_id = ${userId}
        AND status = 'solved'
        AND solved_at >= CURRENT_DATE
    `),
  ]);

  // Extract user + analytics from combined row
  const userRow = userWithAnalytics.rows[0] as any;
  const analyticsData = {
    categoryBreakdown: userRow?.category_breakdown,
    readinessScore: userRow?.readiness_score,
    readinessBreakdown: userRow?.readiness_breakdown,
  };

  // Extract leaderboard data
  const lb = leaderboardResult.rows[0] as any;
  const rank = lb ? Number(lb.rank) : null;
  const totalParticipantsCount = lb ? Number(lb.total_participants) : 0;

  // Aggregate progress
  const total = getProblemsCount();
  const byStatus: Record<string, number> = {};
  for (const row of progressResult) {
    byStatus[row.status] = Number(row.count);
  }
  const solved = byStatus.solved ?? 0;
  const solvedToday = Number((todayResult.rows[0] as any)?.count ?? 0);

  const user = userRow;
  const targetFaculties = (user?.target_faculties as string[]) || [];

  // Build faculty exam dates for user's target faculties
  const facultyExamDates = facultyResult
    .filter((f) => targetFaculties.includes(f.id))
    .map((f) => ({
      id: f.id,
      name: f.name,
      shortName: f.shortName,
      examDate: f.examDate,
    }));

  // Calculate countdown to earliest exam from faculty dates
  let countdownTarget: string | null = null;
  // Use the earliest exam date from user's target faculties
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

  const breakdown = (analyticsData.categoryBreakdown as Record<string, any>) || {};

  // Recompute inactivity penalty at read time
  const storedBreakdown = analyticsData.readinessBreakdown as any;
  let readinessScore = Number(analyticsData.readinessScore ?? 0);
  if (storedBreakdown?.rawScore != null && user?.last_active_date) {
    const lastActive = new Date(user.last_active_date);
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

  // Generate daily recommendations
  const recommendations = generateRecommendations({
    categoryGroups: categoryGroups.map((g) => ({
      id: g.id,
      name: g.name,
      readinessScore: g.readinessScore ?? 0,
    })),
    readinessScore,
    examCount: examHistoryResult.length,
  });

  return NextResponse.json({
    user: {
      displayName: user?.display_name ?? "Korisnik",
      avatarUrl: user?.avatar_url,
      streakCurrent: user?.streak_current ?? 0,
      streakBest: user?.streak_best ?? 0,
      targetFaculties,
    },
    progress: {
      total,
      solved,
      dailyGoal: user?.daily_goal ?? 3,
      solvedToday,
    },
    lastExam,
    countdown: countdownTarget,
    categoryGroups,
    rank: {
      position: rank,
      totalParticipants: totalParticipantsCount,
      totalScore: lb?.total_score ?? "0",
      problemsSolved: lb?.problems_solved ?? 0,
      avgScore: lb?.avg_exam_percent ?? "0",
    },
    readinessScore,
    recentExams: examHistoryResult.slice(0, 3).map((e) => ({
      id: e.id,
      facultyName: e.facultyName,
      scorePercent: e.scorePercent,
      numCorrect: e.numCorrect,
      numWrong: e.numWrong,
      numBlank: e.numBlank,
      timeSpent: e.timeSpent,
      durationLimit: e.durationLimit,
      testSize: e.testSize,
      startedAt: e.startedAt,
    })),
    facultyExamDates,
    recommendations,
  });
}
