import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { resolveBookmarkToken } from "@/lib/utils/bookmark-token";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const rows = await db
    .select({ problemId: bookmarks.problemId })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId));

  const problemId = resolveBookmarkToken(
    userId,
    token,
    rows.map((r) => r.problemId),
  );

  if (!problemId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.problemId, problemId)));

  return NextResponse.json({ removed: true });
}
