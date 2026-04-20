import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cardComments, users } from "@/drizzle/schema";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const page = Math.max(Number(url.searchParams.get("page") ?? "1"), 1);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "50"), 200);
  const offset = (page - 1) * limit;
  const status = url.searchParams.get("status") ?? "";
  const search = url.searchParams.get("search") ?? "";

  const where = and(
    status ? eq(cardComments.status, status as "open" | "resolved" | "hidden") : undefined,
    search
      ? or(
          ilike(users.displayName, `%${search}%`),
          ilike(cardComments.problemId, `%${search}%`)
        )
      : undefined
  );

  const [totalRow, rows] = await Promise.all([
    db
      .select({ total: count() })
      .from(cardComments)
      .innerJoin(users, eq(cardComments.userId, users.id))
      .where(where),
    db
      .select({
        id: cardComments.id,
        userId: cardComments.userId,
        problemId: cardComments.problemId,
        cardType: cardComments.cardType,
        stepNumber: cardComments.stepNumber,
        parentCommentId: cardComments.parentCommentId,
        kind: cardComments.kind,
        body: cardComments.body,
        status: cardComments.status,
        reportCount: cardComments.reportCount,
        createdAt: cardComments.createdAt,
        updatedAt: cardComments.updatedAt,
        authorDisplayName: users.displayName,
      })
      .from(cardComments)
      .innerJoin(users, eq(cardComments.userId, users.id))
      .where(where)
      .orderBy(
        desc(
          sql`CASE WHEN ${cardComments.status} = 'hidden' AND ${cardComments.reportCount} > 0 THEN 2
                   WHEN ${cardComments.reportCount} > 0 THEN 1
                   ELSE 0 END`
        ),
        desc(cardComments.createdAt)
      )
      .limit(limit)
      .offset(offset),
  ]);

  return NextResponse.json({
    total: totalRow[0]?.total ?? 0,
    comments: rows.map((r) => ({
      ...r,
      createdAt: r.createdAt?.toISOString() ?? "",
      updatedAt: r.updatedAt?.toISOString() ?? "",
    })),
  });
}
