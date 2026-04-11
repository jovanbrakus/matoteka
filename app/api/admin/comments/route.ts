import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cardComments, users } from "@/drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";
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
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "50"), 200);
  const offset = Math.max(Number(url.searchParams.get("offset") ?? "0"), 0);

  // Moderation queue: hidden-with-reports first, then newest.
  const rows = await db
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
    .orderBy(
      desc(
        sql`CASE WHEN ${cardComments.status} = 'hidden' AND ${cardComments.reportCount} > 0 THEN 2
                 WHEN ${cardComments.reportCount} > 0 THEN 1
                 ELSE 0 END`
      ),
      desc(cardComments.createdAt)
    )
    .limit(limit)
    .offset(offset);

  return NextResponse.json({
    comments: rows.map((r) => ({
      ...r,
      createdAt: r.createdAt?.toISOString() ?? "",
      updatedAt: r.updatedAt?.toISOString() ?? "",
    })),
  });
}
