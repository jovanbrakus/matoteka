import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq, and, count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemFull } from "@/lib/problems";

export async function POST(req: Request, { params }: { params: Promise<{ problemId: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { problemId } = await params;

  const existing = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.problemId, problemId)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(bookmarks).where(and(eq(bookmarks.userId, userId), eq(bookmarks.problemId, problemId)));
    return NextResponse.json({ bookmarked: false });
  } else {
    const [{ value: total }] = await db
      .select({ value: count() })
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
    if (total >= 30) {
      return NextResponse.json(
        { error: "Dostignut je limit od 30 sačuvanih zadataka." },
        { status: 409 },
      );
    }
    const parsed = getProblemFull(problemId);
    await db.insert(bookmarks).values({ userId, problemId, title: parsed?.title ?? null }).onConflictDoNothing();
    return NextResponse.json({ bookmarked: true });
  }
}
