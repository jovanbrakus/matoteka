import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockExams, mockExamProblems, problems, faculties } from "@/drizzle/schema";
import { eq, and, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { id } = await params;

  const exam = await db
    .select()
    .from(mockExams)
    .where(and(eq(mockExams.id, id), eq(mockExams.userId, userId)))
    .limit(1);

  if (exam.length === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const faculty = await db
    .select()
    .from(faculties)
    .where(eq(faculties.id, exam[0].facultyId))
    .limit(1);

  const examProblems = await db
    .select({
      id: mockExamProblems.id,
      position: mockExamProblems.position,
      pointValue: mockExamProblems.pointValue,
      answer: mockExamProblems.answer,
      isFlagged: mockExamProblems.isFlagged,
      problemId: problems.id,
      title: problems.title,
      htmlContent: problems.htmlContent,
      problemText: problems.problemText,
      answerOptions: problems.answerOptions,
      numOptions: problems.numOptions,
      difficulty: problems.difficulty,
      facultyId: problems.facultyId,
      year: problems.year,
    })
    .from(mockExamProblems)
    .innerJoin(problems, eq(mockExamProblems.problemId, problems.id))
    .where(eq(mockExamProblems.examId, id))
    .orderBy(asc(mockExamProblems.position));

  return NextResponse.json({
    exam: exam[0],
    faculty: faculty[0],
    problems: examProblems,
  });
}
