import { auth } from "@/lib/auth";
import { db, withTransaction } from "@/lib/db";
import { cardComments, cardCommentReports } from "@/drizzle/schema";
import {
  AUTO_HIDE_REPORT_THRESHOLD,
  isReportReason,
} from "@/lib/comments";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;
  const reporterUserId = session.user.id;

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isReportReason(payload?.reason)) {
    return NextResponse.json({ error: "Invalid reason" }, { status: 400 });
  }
  const note: string | null =
    typeof payload?.note === "string" && payload.note.trim().length > 0
      ? payload.note.trim().slice(0, 500)
      : null;

  const existing = await db
    .select({ userId: cardComments.userId, status: cardComments.status })
    .from(cardComments)
    .where(eq(cardComments.id, commentId))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (existing[0].userId === reporterUserId) {
    return NextResponse.json(
      { error: "Ne možeš prijaviti sopstveni komentar" },
      { status: 403 }
    );
  }

  // Check for duplicate report (same user already reported this comment).
  const prior = await db
    .select()
    .from(cardCommentReports)
    .where(
      and(
        eq(cardCommentReports.commentId, commentId),
        eq(cardCommentReports.reporterUserId, reporterUserId)
      )
    )
    .limit(1);

  if (prior.length > 0) {
    return NextResponse.json(
      { error: "Već si prijavio ovaj komentar" },
      { status: 409 }
    );
  }

  // Insert the report and bump the comment's reportCount atomically.
  await withTransaction(async (tx) => {
    await tx.insert(cardCommentReports).values({
      commentId,
      reporterUserId,
      reason: payload.reason,
      note,
    });
    await tx
      .update(cardComments)
      .set({
        reportCount: sql`${cardComments.reportCount} + 1`,
        status: sql`CASE
          WHEN ${cardComments.status} = 'hidden' THEN 'hidden'
          WHEN ${cardComments.reportCount} + 1 >= ${AUTO_HIDE_REPORT_THRESHOLD} THEN 'hidden'
          ELSE ${cardComments.status}
        END`,
        updatedAt: new Date(),
      })
      .where(eq(cardComments.id, commentId));
  });

  return NextResponse.json({ reported: true });
}
