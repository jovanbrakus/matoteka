import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress, userAnalytics } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getCategoryGroupsWithCounts } from "@/lib/problems";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Get user's solved problem IDs and readiness breakdown in parallel
  const [progressRows, analyticsRows] = await Promise.all([
    db
      .select({ problemId: problemProgress.problemId, isCorrect: problemProgress.isCorrect })
      .from(problemProgress)
      .where(eq(problemProgress.userId, userId)),
    db
      .select({ readinessBreakdown: userAnalytics.readinessBreakdown })
      .from(userAnalytics)
      .where(eq(userAnalytics.userId, userId))
      .limit(1),
  ]);

  const solvedIds = new Set(progressRows.filter((r) => r.isCorrect).map((r) => r.problemId));
  const groupsWithCounts = getCategoryGroupsWithCounts(solvedIds);

  // Extract readiness scores from breakdown
  const breakdown = analyticsRows[0]?.readinessBreakdown as any;
  const groupScores = breakdown?.groupScores ?? {};

  const categories = groupsWithCounts.map((group) => {
    const gs = groupScores[group.id];
    return {
      id: group.id,
      name: group.name,
      totalProblems: group.total,
      solvedCorrectly: group.solved,
      progressPercent: group.total > 0 ? Math.round((group.solved / group.total) * 100) : 0,
      readinessScore: Math.round(gs?.score ?? 0),
      categories: group.categories.map((cat) => ({
        ...cat,
        readinessScore: Math.round(gs?.subcategories?.[cat.id]?.score ?? 0),
      })),
    };
  });

  return NextResponse.json({ categories });
}
