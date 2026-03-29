import { requireAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { solutionViews, solutionDailyUsage, users } from "@/drizzle/schema";
import { sql, desc, eq, ilike, or, and, gte, lte } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const search = req.nextUrl.searchParams.get("search") || "";
  const dateFrom = req.nextUrl.searchParams.get("from") || "";
  const dateTo = req.nextUrl.searchParams.get("to") || "";
  const tab = req.nextUrl.searchParams.get("tab") || "views";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  const limit = 50;
  const offset = (page - 1) * limit;

  if (tab === "daily") {
    // Daily usage counters with user info
    const conditions = [];
    if (dateFrom) conditions.push(gte(solutionDailyUsage.date, dateFrom));
    if (dateTo) conditions.push(lte(solutionDailyUsage.date, dateTo));
    if (search) {
      conditions.push(
        or(
          ilike(users.displayName, `%${search}%`),
          ilike(users.email, `%${search}%`)
        )
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db
        .select({
          userId: solutionDailyUsage.userId,
          date: solutionDailyUsage.date,
          count: solutionDailyUsage.count,
          displayName: users.displayName,
          email: users.email,
        })
        .from(solutionDailyUsage)
        .innerJoin(users, eq(solutionDailyUsage.userId, users.id))
        .where(where)
        .orderBy(desc(solutionDailyUsage.date))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(solutionDailyUsage)
        .innerJoin(users, eq(solutionDailyUsage.userId, users.id))
        .where(where),
    ]);

    return NextResponse.json({ rows, total: Number(countResult[0]?.count ?? 0), page, limit });
  }

  // Default: audit log (individual views)
  const conditions = [];
  if (dateFrom) conditions.push(gte(solutionViews.viewedAt, new Date(dateFrom + "T00:00:00Z")));
  if (dateTo) conditions.push(lte(solutionViews.viewedAt, new Date(dateTo + "T23:59:59Z")));
  if (search) {
    conditions.push(
      or(
        ilike(users.displayName, `%${search}%`),
        ilike(users.email, `%${search}%`),
        ilike(solutionViews.problemId, `%${search}%`)
      )
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, countResult] = await Promise.all([
    db
      .select({
        id: solutionViews.id,
        userId: solutionViews.userId,
        problemId: solutionViews.problemId,
        viewedAt: solutionViews.viewedAt,
        ipAddress: solutionViews.ipAddress,
        displayName: users.displayName,
        email: users.email,
      })
      .from(solutionViews)
      .innerJoin(users, eq(solutionViews.userId, users.id))
      .where(where)
      .orderBy(desc(solutionViews.viewedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(solutionViews)
      .innerJoin(users, eq(solutionViews.userId, users.id))
      .where(where),
  ]);

  return NextResponse.json({ rows, total: Number(countResult[0]?.count ?? 0), page, limit });
}
