import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DbOrTx = { select: (...args: any[]) => any; update: (...args: any[]) => any };

/**
 * Update daily streak when a problem is correctly solved.
 * Streak extends when the first correct solve of the day happens.
 * If a day is missed, streak resets to 1.
 * Accepts optional transaction object for use within db.transaction().
 */
export async function updateStreakOnCorrectSolve(
  userId: string,
  txDb: DbOrTx = db
): Promise<void> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [user] = await txDb
    .select({
      lastActiveDate: users.lastActiveDate,
      streakCurrent: users.streakCurrent,
      streakBest: users.streakBest,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return;

  // Already solved today — no streak change
  if (user.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak: number;
  if (user.lastActiveDate === yesterdayStr) {
    // Consecutive day — extend streak
    newStreak = user.streakCurrent + 1;
  } else {
    // Missed a day (or first time) — reset to 1
    newStreak = 1;
  }

  const newBest = Math.max(user.streakBest, newStreak);

  await txDb
    .update(users)
    .set({
      streakCurrent: newStreak,
      streakBest: newBest,
      lastActiveDate: today,
    })
    .where(eq(users.id, userId));
}
