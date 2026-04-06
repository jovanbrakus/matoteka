import { getProblemFull } from "@/lib/problems";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId } = await params;

  const problem = getProblemFull(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: problem.id,
    title: problem.title,
    facultyId: problem.facultyId,
    year: problem.year,
    problemNumber: problem.problemNumber,
    correctAnswer: problem.correctAnswer,
    answerOptions: problem.answerOptions,
    numOptions: problem.numOptions,
    difficulty: problem.difficulty,
    category: problem.category,
  });
}
