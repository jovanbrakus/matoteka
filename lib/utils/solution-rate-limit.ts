import { db } from "@/lib/db";
import { solutionDailyUsage, solutionViews } from "@/drizzle/schema";
import { eq, and, sql, gte } from "drizzle-orm";

const SOLUTION_DAILY_LIMIT = parseInt(process.env.SOLUTION_DAILY_LIMIT || "30", 10);

export async function checkSolutionRateLimit(
  userId: string
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = new Date().toISOString().split("T")[0];

  const result = await db
    .select({ count: solutionDailyUsage.count })
    .from(solutionDailyUsage)
    .where(and(eq(solutionDailyUsage.userId, userId), eq(solutionDailyUsage.date, today)))
    .limit(1);

  const used = result[0]?.count ?? 0;

  return { allowed: used < SOLUTION_DAILY_LIMIT, used, limit: SOLUTION_DAILY_LIMIT };
}

/**
 * Record a solution view. Increments the daily counter only for new unique views.
 * The audit log insert is fire-and-forget to avoid slowing down the response.
 */
export async function recordSolutionView(
  userId: string,
  problemId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<{ isNewToday: boolean }> {
  const today = new Date().toISOString().split("T")[0];
  const todayStart = new Date(today + "T00:00:00Z");

  // Check if this specific solution was already viewed today
  const existing = await db
    .select({ id: solutionViews.id })
    .from(solutionViews)
    .where(
      and(
        eq(solutionViews.userId, userId),
        eq(solutionViews.problemId, problemId),
        gte(solutionViews.viewedAt, todayStart)
      )
    )
    .limit(1);

  const isNewToday = existing.length === 0;

  // Fire-and-forget: log the view without awaiting
  db.insert(solutionViews)
    .values({ userId, problemId, ipAddress, userAgent })
    .catch(() => {});

  // Only increment daily counter for new unique views
  if (isNewToday) {
    await db
      .insert(solutionDailyUsage)
      .values({ userId, date: today, count: 1 })
      .onConflictDoUpdate({
        target: [solutionDailyUsage.userId, solutionDailyUsage.date],
        set: { count: sql`${solutionDailyUsage.count} + 1` },
      });
  }

  return { isNewToday };
}
