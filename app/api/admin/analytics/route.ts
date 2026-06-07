import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { users, mockExams, solutionViews } from "@/drizzle/schema";
import { sql, gte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemsCount } from "@/lib/problems";

const TREND_DAYS = 30;

/** Zero-fill a per-day count series over the last TREND_DAYS finished days (oldest first). */
function fillDailySeries(
  rows: { day: string; count: number }[],
  todayUtc: string
): { date: string; count: number }[] {
  const byDay = new Map(rows.map((r) => [String(r.day).slice(0, 10), Number(r.count)]));
  const todayMs = new Date(todayUtc + "T00:00:00Z").getTime();
  const series: { date: string; count: number }[] = [];
  for (let i = TREND_DAYS; i >= 1; i--) {
    const date = new Date(todayMs - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    series.push({ date, count: byDay.get(date) ?? 0 });
  }
  return series;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  // Trend range: last TREND_DAYS finished UTC days; today (in progress) is excluded.
  const trendStart = new Date(
    new Date(today + "T00:00:00Z").getTime() - TREND_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const [usersCount, examsCount, activeToday, newThisWeek, registrationsRows, viewsRows] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(users),
      db.select({ count: sql<number>`count(*)` }).from(mockExams),
      db.select({ count: sql<number>`count(*)` }).from(users).where(sql`${users.lastActiveDate} = ${today}`),
      db.select({ count: sql<number>`count(*)` }).from(users).where(gte(users.createdAt, new Date(weekAgo))),
      db
        .select({
          day: sql<string>`to_char(${users.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
          count: sql<number>`count(*)::int`,
        })
        .from(users)
        .where(sql`${users.createdAt} >= ${trendStart} AND ${users.createdAt} < ${today + "T00:00:00Z"}`)
        .groupBy(sql`1`),
      db
        .select({
          day: sql<string>`to_char(${solutionViews.viewedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
          count: sql<number>`count(*)::int`,
        })
        .from(solutionViews)
        .where(sql`${solutionViews.viewedAt} >= ${trendStart} AND ${solutionViews.viewedAt} < ${today + "T00:00:00Z"}`)
        .groupBy(sql`1`),
    ]);

  return NextResponse.json({
    totalUsers: Number(usersCount[0]?.count ?? 0),
    totalProblems: getProblemsCount(),
    totalExams: Number(examsCount[0]?.count ?? 0),
    activeUsersToday: Number(activeToday[0]?.count ?? 0),
    newUsersThisWeek: Number(newThisWeek[0]?.count ?? 0),
    registrationsByDay: fillDailySeries(registrationsRows, today),
    viewsByDay: fillDailySeries(viewsRows, today),
  });
}
