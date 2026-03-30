import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress, bookmarks } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { getProblemFull, queryProblems } from "@/lib/problems";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Admin-only: this endpoint exposes the full problem catalog
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const faculty = url.searchParams.get("faculty") || undefined;
  const year = url.searchParams.get("year");
  const topic = url.searchParams.get("topic") || undefined;
  const topics = url.searchParams.get("topics") || undefined; // comma-separated
  const diffMin = url.searchParams.get("diffMin");
  const diffMax = url.searchParams.get("diffMax");
  const search = url.searchParams.get("search") || undefined;
  const status = url.searchParams.get("status") || undefined;
  const page = Math.max(parseInt(url.searchParams.get("page") || "1") || 1, 1);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "30") || 30, 100);

  // If status filter is used, we need the user's progress/bookmarks
  let solvedIds: Set<string> | null = null;
  let bookmarkedIds: Set<string> | null = null;

  if (status && status !== "all") {
    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (status === "solved" || status === "unsolved") {
      const rows = await db
        .select({ problemId: problemProgress.problemId })
        .from(problemProgress)
        .where(
          and(
            eq(problemProgress.userId, userId),
            eq(problemProgress.isCorrect, true)
          )
        );
      solvedIds = new Set(rows.map((r) => r.problemId));
    }

    if (status === "bookmarked") {
      const rows = await db
        .select({ problemId: bookmarks.problemId })
        .from(bookmarks)
        .where(eq(bookmarks.userId, userId));
      bookmarkedIds = new Set(rows.map((r) => r.problemId));
    }
  }

  // Query all matching problems (without pagination if we need to filter by status)
  const needsPostFilter = solvedIds !== null || bookmarkedIds !== null;

  const { problems: allProblems, total: rawTotal } = queryProblems({
    faculty,
    year: year ? parseInt(year) : undefined,
    category: topic,
    categories: topics ? topics.split(",") : undefined,
    diffMin: diffMin ? parseFloat(diffMin) : undefined,
    diffMax: diffMax ? parseFloat(diffMax) : undefined,
    search,
    page: needsPostFilter ? 1 : page,
    limit: needsPostFilter ? 100000 : limit,
  });

  let filtered = allProblems;

  if (status === "solved" && solvedIds) {
    filtered = filtered.filter((p) => solvedIds!.has(p.id));
  } else if (status === "unsolved" && solvedIds) {
    filtered = filtered.filter((p) => !solvedIds!.has(p.id));
  } else if (status === "bookmarked" && bookmarkedIds) {
    filtered = filtered.filter((p) => bookmarkedIds!.has(p.id));
  }

  const total = needsPostFilter ? filtered.length : rawTotal;
  const offset = needsPostFilter ? (page - 1) * limit : 0;
  const problems = needsPostFilter ? filtered.slice(offset, offset + limit) : filtered;

  return NextResponse.json({
    problems: problems.map((p) => {
      const full = getProblemFull(p.id);
      return {
        id: p.id,
        title: full?.title ?? `Zadatak ${p.problemNumber}`,
        facultyId: p.facultyId,
        year: p.year,
        problemNumber: p.problemNumber,
        numOptions: full?.numOptions ?? 5,
        difficulty: p.difficulty,
        category: p.category,
      };
    }),
    total,
    page,
    limit,
  });
}
