import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemFull } from "@/lib/problems";
import { resolveBookmarkToken } from "@/lib/utils/bookmark-token";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { token } = await params;

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

  const problem = getProblemFull(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    token,
    title: problem.title,
    facultyId: problem.facultyId,
    year: problem.year,
    problemNumber: problem.problemNumber,
    answerOptions: problem.answerOptions,
    numOptions: problem.numOptions,
    difficulty: problem.difficulty,
    category: problem.category,
  });
}
