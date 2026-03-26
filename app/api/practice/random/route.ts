import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { queryProblems } from "@/lib/problems";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const url = new URL(req.url);
  const topics = url.searchParams.get("topics");

  if (!topics) {
    return NextResponse.json({ error: "Missing topics parameter" }, { status: 400 });
  }

  const topicList = topics.split(",").filter(Boolean);

  // Get solved problem IDs for this user
  const solvedRows = await db
    .select({ problemId: problemProgress.problemId })
    .from(problemProgress)
    .where(
      and(eq(problemProgress.userId, userId), eq(problemProgress.status, "solved"))
    );
  const solvedIds = new Set(solvedRows.map((r) => r.problemId));

  // Get all problems matching the topics
  const { problems: allProblems } = queryProblems({
    categories: topicList,
    limit: 10000,
    page: 1,
  });

  // Prefer unsolved problems
  const unsolved = allProblems.filter((p) => !solvedIds.has(p.id));
  const pool = unsolved.length > 0 ? unsolved : allProblems;

  if (pool.length === 0) {
    return NextResponse.json({ error: "No problems found for these topics" }, { status: 404 });
  }

  // Pick a random one
  const randomIndex = Math.floor(Math.random() * pool.length);
  const problem = pool[randomIndex];

  return NextResponse.json({
    problemId: problem.id,
    category: problem.category,
    facultyId: problem.facultyId,
    year: problem.year,
    difficulty: problem.difficulty,
    isNew: !solvedIds.has(problem.id),
    remainingUnsolved: unsolved.length,
    totalInPool: allProblems.length,
  });
}
