import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userAnalytics, mockExams, faculties } from "@/drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Fetch analytics data
  const analyticsRows = await db
    .select()
    .from(userAnalytics)
    .where(eq(userAnalytics.userId, userId))
    .limit(1);

  const analytics = analyticsRows[0] ?? null;

  // Fetch recent completed simulations (last 5)
  const recentExams = await db
    .select({
      id: mockExams.id,
      facultyId: mockExams.facultyId,
      facultyName: faculties.shortName,
      scorePercent: mockExams.scorePercent,
      timeSpent: mockExams.timeSpent,
      numCorrect: mockExams.numCorrect,
      numWrong: mockExams.numWrong,
      numBlank: mockExams.numBlank,
      finishedAt: mockExams.finishedAt,
      mode: mockExams.mode,
    })
    .from(mockExams)
    .innerJoin(faculties, eq(mockExams.facultyId, faculties.id))
    .where(and(eq(mockExams.userId, userId), eq(mockExams.status, "completed")))
    .orderBy(desc(mockExams.finishedAt))
    .limit(5);

  return NextResponse.json({
    analytics: analytics
      ? {
          accuracyPercent: Number(analytics.accuracyPercent),
          avgSolveTimeSec: analytics.avgSolveTimeSec,
          percentileRank: Number(analytics.percentileRank),
          totalSimulations: analytics.totalSimulations,
          problemsSolved: analytics.problemsSolved,
          problemsAttempted: analytics.problemsAttempted,
          categoryBreakdown: analytics.categoryBreakdown,
          strengths: analytics.strengths,
          weaknesses: analytics.weaknesses,
          trendData: analytics.trendData,
          updatedAt: analytics.updatedAt,
        }
      : null,
    recentExams: recentExams.map((e) => ({
      id: e.id,
      facultyId: e.facultyId,
      facultyName: e.facultyName,
      scorePercent: Number(e.scorePercent),
      timeSpent: e.timeSpent,
      numCorrect: e.numCorrect,
      numWrong: e.numWrong,
      numBlank: e.numBlank,
      finishedAt: e.finishedAt,
      mode: e.mode,
    })),
  });
}
