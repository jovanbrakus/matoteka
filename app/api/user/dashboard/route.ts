import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  problems,
  problemProgress,
  mockExams,
  faculties,
  leaderboardScores,
  topics,
  users,
  seasons,
} from "@/drizzle/schema";
import { eq, sql, gt, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;

  const [
    userRow,
    totalResult,
    progressResult,
    topicResult,
    examHistoryResult,
    myScoreResult,
    seasonResult,
    facultyResult,
  ] = await Promise.all([
    // User info (streak, target faculties)
    db.select().from(users).where(eq(users.id, userId)).limit(1),

    // Total published problems
    db
      .select({ count: sql<number>`count(*)` })
      .from(problems)
      .where(eq(problems.isPublished, true)),

    // User progress by status
    db
      .select({
        status: problemProgress.status,
        count: sql<number>`count(*)`,
      })
      .from(problemProgress)
      .where(eq(problemProgress.userId, userId))
      .groupBy(problemProgress.status),

    // Topic progress
    db.execute(sql`
      SELECT
        t.id as topic_id,
        t.name,
        t.icon,
        COUNT(DISTINCT pt.problem_id) as total,
        COUNT(DISTINCT CASE WHEN pp.status = 'solved' THEN pt.problem_id END) as solved
      FROM topics t
      JOIN problem_topics pt ON pt.topic_id = t.id
      JOIN problems p ON p.id = pt.problem_id AND p.is_published = true
      LEFT JOIN problem_progress pp ON pp.problem_id = pt.problem_id AND pp.user_id = ${userId}
      GROUP BY t.id, t.name, t.icon
      ORDER BY t.sort_order, t.name
    `),

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
  const total = Number(totalResult[0]?.count ?? 0);
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
      dailyGoal: 20,
      solvedToday,
    },
    lastExam,
    countdown: countdownTarget,
    topics: topicResult.rows,
    rank: {
      position: rank,
      totalParticipants: Number(totalParticipants[0]?.count ?? 0),
      totalScore: myScoreResult[0]?.totalScore ?? "0",
      problemsSolved: myScoreResult[0]?.problemsSolved ?? 0,
      avgScore: myScoreResult[0]?.avgExamPercent ?? "0",
    },
    facultyExamDates,
    season: seasonResult[0] ?? null,
  });
}
