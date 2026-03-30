import { db } from "@/lib/db";
import { aiDailyUsage } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

const AI_DAILY_LIMIT = parseInt(process.env.AI_DAILY_LIMIT || "20", 10);

/**
 * Atomically check and increment AI usage in a single operation.
 * Returns whether the request is allowed and current usage.
 */
export async function checkAndIncrementAiUsage(
  userId: string
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = new Date().toISOString().split("T")[0];

  // Atomic upsert: increment count and return new value in one query
  const result = await db
    .insert(aiDailyUsage)
    .values({ userId, date: today, count: 1 })
    .onConflictDoUpdate({
      target: [aiDailyUsage.userId, aiDailyUsage.date],
      set: { count: sql`${aiDailyUsage.count} + 1` },
    })
    .returning({ count: aiDailyUsage.count });

  const used = result[0]?.count ?? 1;

  // If we already exceeded the limit, roll back the increment
  if (used > AI_DAILY_LIMIT) {
    await db
      .update(aiDailyUsage)
      .set({ count: sql`${aiDailyUsage.count} - 1` })
      .where(and(eq(aiDailyUsage.userId, userId), eq(aiDailyUsage.date, today)));
    return { allowed: false, used: used - 1, limit: AI_DAILY_LIMIT };
  }

  return { allowed: true, used, limit: AI_DAILY_LIMIT };
}

/** @deprecated Use checkAndIncrementAiUsage instead */
export async function checkAiRateLimit(userId: string): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = new Date().toISOString().split("T")[0];
  const result = await db
    .select({ count: aiDailyUsage.count })
    .from(aiDailyUsage)
    .where(and(eq(aiDailyUsage.userId, userId), eq(aiDailyUsage.date, today)))
    .limit(1);
  const used = result[0]?.count ?? 0;
  return { allowed: used < AI_DAILY_LIMIT, used, limit: AI_DAILY_LIMIT };
}

/** @deprecated Use checkAndIncrementAiUsage instead */
export async function incrementAiUsage(userId: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  await db
    .insert(aiDailyUsage)
    .values({ userId, date: today, count: 1 })
    .onConflictDoUpdate({
      target: [aiDailyUsage.userId, aiDailyUsage.date],
      set: { count: sql`${aiDailyUsage.count} + 1` },
    });
}
