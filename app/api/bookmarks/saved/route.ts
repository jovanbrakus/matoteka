import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemMeta, getCategories } from "@/lib/problems";
import { generateBookmarkToken } from "@/lib/utils/bookmark-token";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const rows = await db
    .select({
      problemId: bookmarks.problemId,
      title: bookmarks.title,
      createdAt: bookmarks.createdAt,
    })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  const catMap = new Map(getCategories().map((c) => [c.id, c.sr]));

  const result = rows
    .map((row) => {
      const meta = getProblemMeta(row.problemId);
      if (!meta) return null;
      return {
        token: generateBookmarkToken(userId, row.problemId),
        title: row.title || `${meta.facultyId.toUpperCase()} ${meta.year} #${meta.problemNumber}`,
        facultyId: meta.facultyId,
        year: meta.year,
        problemNumber: meta.problemNumber,
        difficulty: meta.difficulty,
        category: meta.category ? (catMap.get(meta.category) ?? meta.category) : null,
        createdAt: row.createdAt,
      };
    })
    .filter(Boolean);

  return NextResponse.json(result);
}
