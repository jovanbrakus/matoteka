import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cardComments } from "@/drizzle/schema";
import {
  EDIT_WINDOW_MS,
  isCommentStatus,
  validateBody,
} from "@/lib/comments";
import { eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;
  const userId = session.user.id;
  const isAdmin = session.user.role === "admin";

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(cardComments)
    .where(eq(cardComments.id, commentId))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const comment = existing[0];

  const updates: Record<string, unknown> = {};

  // Body edit: author only, within the edit window.
  if (payload.body !== undefined) {
    if (comment.userId !== userId) {
      return NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 });
    }
    const createdAt = comment.createdAt?.getTime() ?? 0;
    if (Date.now() - createdAt > EDIT_WINDOW_MS) {
      return NextResponse.json(
        { error: "Istekao je rok za izmenu komentara" },
        { status: 403 }
      );
    }
    const bodyValidation = validateBody(payload.body);
    if (!bodyValidation.ok) {
      return NextResponse.json({ error: bodyValidation.error }, { status: 400 });
    }
    updates.body = bodyValidation.body;
  }

  // Status change: admin only.
  if (payload.status !== undefined) {
    if (!isAdmin) {
      return NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 });
    }
    if (!isCommentStatus(payload.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    updates.status = payload.status;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  updates.updatedAt = new Date();

  const [updated] = await db
    .update(cardComments)
    .set(updates)
    .where(eq(cardComments.id, commentId))
    .returning();

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    body: updated.body,
    updatedAt: updated.updatedAt?.toISOString() ?? "",
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;
  const userId = session.user.id;
  const isAdmin = session.user.role === "admin";

  const existing = await db
    .select({ userId: cardComments.userId })
    .from(cardComments)
    .where(eq(cardComments.id, commentId))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!isAdmin && existing[0].userId !== userId) {
    return NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 });
  }

  // Cascade-delete replies along with the top-level comment.
  await db
    .delete(cardComments)
    .where(
      or(eq(cardComments.id, commentId), eq(cardComments.parentCommentId, commentId))
    );

  return NextResponse.json({ deleted: true });
}
