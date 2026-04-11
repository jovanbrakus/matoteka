import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cardComments, users } from "@/drizzle/schema";
import {
  anchorKey,
  CommentRow,
  CommentsResponse,
  CommentThread,
  DAILY_COMMENT_LIMIT,
  isCommentKind,
  validateAnchor,
  validateBody,
} from "@/lib/comments";
import { and, asc, count, eq, gt, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId } = await params;
  const isAdmin = session.user.role === "admin";

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
    .where(eq(cardComments.problemId, problemId))
    .orderBy(asc(cardComments.createdAt));

  const visibleRows = isAdmin ? rows : rows.filter((r) => r.status !== "hidden");

  // Group by anchor, separating top-level comments from replies.
  const threadsByAnchor: Record<string, CommentThread[]> = {};
  const counts: Record<string, number> = {};
  const byId = new Map<string, CommentThread>();

  // First pass: top-level comments (parent_comment_id IS NULL).
  for (const r of visibleRows) {
    if (r.parentCommentId) continue;
    const key = anchorKey(r.cardType as CommentRow["cardType"], r.stepNumber);
    const thread: CommentThread = {
      comment: {
        ...r,
        createdAt: r.createdAt?.toISOString() ?? "",
        updatedAt: r.updatedAt?.toISOString() ?? "",
      } as CommentRow,
      replies: [],
    };
    byId.set(r.id, thread);
    if (!threadsByAnchor[key]) threadsByAnchor[key] = [];
    threadsByAnchor[key].push(thread);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  // Second pass: replies attach to their parent thread.
  for (const r of visibleRows) {
    if (!r.parentCommentId) continue;
    const parent = byId.get(r.parentCommentId);
    if (!parent) continue; // orphaned reply (parent was deleted) — skip
    parent.replies.push({
      ...r,
      createdAt: r.createdAt?.toISOString() ?? "",
      updatedAt: r.updatedAt?.toISOString() ?? "",
    } as CommentRow);
    const key = anchorKey(r.cardType as CommentRow["cardType"], r.stepNumber);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  const body: CommentsResponse = { anchors: threadsByAnchor, counts };
  return NextResponse.json(body);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { problemId } = await params;

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const anchor = validateAnchor(payload?.cardType, payload?.stepNumber ?? null);
  if (!anchor.ok) {
    return NextResponse.json({ error: anchor.error }, { status: 400 });
  }
  if (!isCommentKind(payload?.kind)) {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }
  const bodyValidation = validateBody(payload?.body);
  if (!bodyValidation.ok) {
    return NextResponse.json({ error: bodyValidation.error }, { status: 400 });
  }

  // If replying, verify the parent exists, belongs to this problem + anchor, and is not hidden.
  let parentCommentId: string | null = null;
  if (payload?.parentCommentId != null) {
    if (typeof payload.parentCommentId !== "string") {
      return NextResponse.json({ error: "Invalid parentCommentId" }, { status: 400 });
    }
    const parent = await db
      .select({
        id: cardComments.id,
        problemId: cardComments.problemId,
        cardType: cardComments.cardType,
        stepNumber: cardComments.stepNumber,
        status: cardComments.status,
        parentCommentId: cardComments.parentCommentId,
      })
      .from(cardComments)
      .where(eq(cardComments.id, payload.parentCommentId))
      .limit(1);
    if (parent.length === 0) {
      return NextResponse.json({ error: "Parent comment not found" }, { status: 404 });
    }
    const p = parent[0];
    if (p.problemId !== problemId) {
      return NextResponse.json({ error: "Parent belongs to a different problem" }, { status: 400 });
    }
    if (p.cardType !== anchor.cardType || p.stepNumber !== anchor.stepNumber) {
      return NextResponse.json({ error: "Parent belongs to a different anchor" }, { status: 400 });
    }
    if (p.parentCommentId) {
      return NextResponse.json({ error: "Replies cannot be nested more than one level" }, { status: 400 });
    }
    if (p.status === "hidden") {
      return NextResponse.json({ error: "Cannot reply to a hidden comment" }, { status: 403 });
    }
    parentCommentId = p.id;
  }

  // Rate limit: count this user's comments in the last 24h.
  const [{ value: recent }] = await db
    .select({ value: count() })
    .from(cardComments)
    .where(
      and(
        eq(cardComments.userId, userId),
        gt(cardComments.createdAt, sql`now() - interval '24 hours'`)
      )
    );
  if (recent >= DAILY_COMMENT_LIMIT) {
    return NextResponse.json(
      { error: `Dnevni limit od ${DAILY_COMMENT_LIMIT} komentara je dostignut.` },
      { status: 429 }
    );
  }

  const [inserted] = await db
    .insert(cardComments)
    .values({
      userId,
      problemId,
      cardType: anchor.cardType,
      stepNumber: anchor.stepNumber,
      parentCommentId,
      kind: payload.kind,
      body: bodyValidation.body,
    })
    .returning();

  return NextResponse.json(
    {
      id: inserted.id,
      userId: inserted.userId,
      problemId: inserted.problemId,
      cardType: inserted.cardType,
      stepNumber: inserted.stepNumber,
      parentCommentId: inserted.parentCommentId,
      kind: inserted.kind,
      body: inserted.body,
      status: inserted.status,
      reportCount: inserted.reportCount,
      createdAt: inserted.createdAt?.toISOString() ?? "",
      updatedAt: inserted.updatedAt?.toISOString() ?? "",
      authorDisplayName: session.user.displayName ?? session.user.name ?? "",
    },
    { status: 201 }
  );
}
