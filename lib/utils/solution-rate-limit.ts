import { db } from "@/lib/db";
import { solutionDailyUsage, solutionViews } from "@/drizzle/schema";
import { eq, and, sql, gte, desc } from "drizzle-orm";

const SOLUTION_DAILY_LIMIT = parseInt(process.env.SOLUTION_DAILY_LIMIT || "30", 10);
// Audit-log dedup window: collapse duplicate inserts from iframe reloads,
// React StrictMode double-mounts, and rapid revisits into a single row.
const AUDIT_DEDUP_WINDOW_MS = 60_000;

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
 * Record a solution view. Inserts an audit-log row, deduped within
 * AUDIT_DEDUP_WINDOW_MS to collapse iframe reloads / double-mounts /
 * rapid revisits into a single row. Increments the daily counter only
 * for the first view of a given (user, problem) per day.
 */
export async function recordSolutionView(
  userId: string,
  problemId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<{ isNewToday: boolean }> {
  const today = new Date().toISOString().split("T")[0];
  const todayStart = new Date(today + "T00:00:00Z");

  // Most recent view today for this (user, problem). One query, two facts:
  //   - is there any row today?       → drives daily-counter dedup
  //   - is the latest one very recent? → drives audit-row dedup
  const recent = await db
    .select({ viewedAt: solutionViews.viewedAt })
    .from(solutionViews)
    .where(
      and(
        eq(solutionViews.userId, userId),
        eq(solutionViews.problemId, problemId),
        gte(solutionViews.viewedAt, todayStart)
      )
    )
    .orderBy(desc(solutionViews.viewedAt))
    .limit(1);

  const isNewToday = recent.length === 0;
  const lastViewedAt = recent[0]?.viewedAt ?? null;
  const isRecentDuplicate =
    lastViewedAt !== null &&
    new Date(lastViewedAt).getTime() > Date.now() - AUDIT_DEDUP_WINDOW_MS;

  // Skip the audit insert if we just logged this view — avoids the
  // 5-rows-per-view explosion caused by iframe reloads. Awaited (not
  // fire-and-forget) so back-to-back calls in the same request flight
  // can see each other.
  if (!isRecentDuplicate) {
    await db
      .insert(solutionViews)
      .values({ userId, problemId, ipAddress, userAgent });
  }

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
