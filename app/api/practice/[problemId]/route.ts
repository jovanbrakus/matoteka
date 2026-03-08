import { db } from "@/lib/db";
import { problems, problemTopics, topics, faculties } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const { problemId } = await params;

  const result = await db
    .select()
    .from(problems)
    .where(eq(problems.id, problemId))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const problem = result[0];

  const [topicRows, facultyRows] = await Promise.all([
    db
      .select({ id: topics.id, name: topics.name })
      .from(problemTopics)
      .innerJoin(topics, eq(problemTopics.topicId, topics.id))
      .where(eq(problemTopics.problemId, problem.id)),
    db
      .select({ shortName: faculties.shortName })
      .from(faculties)
      .where(eq(faculties.id, problem.facultyId))
      .limit(1),
  ]);

  return NextResponse.json({
    id: problem.id,
    slug: problem.slug,
    title: problem.title,
    facultyId: problem.facultyId,
    facultyShortName: facultyRows[0]?.shortName || problem.facultyId.toUpperCase(),
    year: problem.year,
    problemNumber: problem.problemNumber,
    correctAnswer: problem.correctAnswer,
    answerOptions: problem.answerOptions,
    numOptions: problem.numOptions,
    difficulty: problem.difficulty,
    topics: topicRows,
  });
}
