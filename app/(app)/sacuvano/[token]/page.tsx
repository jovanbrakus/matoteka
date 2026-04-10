import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getProblemMeta, getCategories } from "@/lib/problems";
import {
  generateBookmarkToken,
  resolveBookmarkToken,
} from "@/lib/utils/bookmark-token";
import SavedProblemViewer from "@/components/saved/SavedProblemViewer";

export interface SavedProblemEntry {
  token: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  difficulty: number | null;
  category: string | null;
}

export default async function SavedProblemPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/prijava");

  const userId = session.user.id;
  const { token } = await params;

  const rows = await db
    .select({
      problemId: bookmarks.problemId,
      title: bookmarks.title,
      createdAt: bookmarks.createdAt,
    })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));

  if (rows.length === 0) redirect("/sacuvano");

  const problemId = resolveBookmarkToken(
    userId,
    token,
    rows.map((r) => r.problemId),
  );

  if (!problemId) redirect("/sacuvano");

  // Build category ID → Serbian name lookup map
  const catMap = new Map(getCategories().map((c) => [c.id, c.sr]));

  // Build the full ordered list with tokens for prev/next + picker
  const allSaved: SavedProblemEntry[] = rows
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
      };
    })
    .filter((x): x is SavedProblemEntry => x !== null);

  const currentIndex = allSaved.findIndex((s) => s.token === token);

  return (
    <SavedProblemViewer
      problemId={problemId}
      token={token}
      allSaved={allSaved}
      currentIndex={currentIndex === -1 ? 0 : currentIndex}
    />
  );
}
