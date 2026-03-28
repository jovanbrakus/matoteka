import { auth } from "@/lib/auth";
import { getProblemFull } from "@/lib/problems";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ problemId: string }> }) {
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
    facultyId: problem.facultyId,
    year: problem.year,
    problemNumber: problem.problemNumber,
    extra: problem.extra,
    title: problem.title,
    correctAnswer: problem.correctAnswer,
    answerOptions: problem.answerOptions,
    numOptions: problem.numOptions,
    category: problem.category,
    difficulty: problem.difficulty,
  });
}
