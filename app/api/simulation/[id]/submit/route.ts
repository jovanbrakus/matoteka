import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  mockExams,
  mockExamProblems,
  problems,
  problemProgress,
} from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const { id } = await params;

  // Get exam
  const exam = await db
    .select()
    .from(mockExams)
    .where(and(eq(mockExams.id, id), eq(mockExams.userId, userId)))
    .limit(1);

  if (exam.length === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (exam[0].status !== "in_progress")
    return NextResponse.json(
      { error: "Simulacija je već završena" },
      { status: 400 }
    );

  // Get exam problems with correct answers and point values
  const examProblems = await db
    .select({
      epId: mockExamProblems.id,
      answer: mockExamProblems.answer,
      pointValue: mockExamProblems.pointValue,
      problemId: problems.id,
      correctAnswer: problems.correctAnswer,
    })
    .from(mockExamProblems)
    .innerJoin(problems, eq(mockExamProblems.problemId, problems.id))
    .where(eq(mockExamProblems.examId, id));

  // Scoring algorithm (spec 12.2)
  let score = 0;
  let numCorrect = 0;
  let numWrong = 0;
  let numBlank = 0;
  let maxScore = 0;

  for (const ep of examProblems) {
    const pv = parseFloat(ep.pointValue);
    maxScore += pv;

    const isBlank = !ep.answer || ep.answer === "N";
    const isCorrect =
      !isBlank &&
      ep.answer?.toUpperCase() === ep.correctAnswer.toUpperCase();

    if (isBlank) {
      // Blank: 0 points
      score += 0;
      numBlank++;
    } else if (isCorrect) {
      // Correct: full points
      score += pv;
      numCorrect++;
    } else {
      // Wrong: -16% of point value
      const penalty = pv * 0.16;
      score -= penalty;
      numWrong++;
    }

    // Mark correct/wrong on exam problem
    await db
      .update(mockExamProblems)
      .set({ isCorrect: isBlank ? null : isCorrect })
      .where(eq(mockExamProblems.id, ep.epId));

    // Update problem_progress
    const status = isCorrect ? "solved" : isBlank ? "unseen" : "attempted";
    if (!isBlank) {
      await db
        .insert(problemProgress)
        .values({
          userId,
          problemId: ep.problemId,
          status,
          attempts: 1,
          lastAnswer: ep.answer,
          isCorrect,
          solvedAt: isCorrect ? new Date() : null,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  const timeSpent = Math.floor(
    (Date.now() - new Date(exam[0].startedAt!).getTime()) / 1000
  );
  const scorePercent = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const clampedPercent = Math.max(0, scorePercent);

  await db
    .update(mockExams)
    .set({
      status: "completed",
      finishedAt: new Date(),
      timeSpent,
      score: score.toFixed(2),
      maxScore: maxScore.toFixed(2),
      scorePercent: clampedPercent.toFixed(2),
      numCorrect,
      numWrong,
      numBlank,
    })
    .where(eq(mockExams.id, id));

  return NextResponse.json({ examId: id });
}
