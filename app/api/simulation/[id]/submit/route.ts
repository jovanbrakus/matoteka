import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  mockExams,
  mockExamProblems,
  problemProgress,
} from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemFull } from "@/lib/problems";
import { updateStreakOnCorrectSolve } from "@/lib/streak";
import { recalculateAnalytics } from "@/lib/analytics";

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

  // Get exam problems
  const examProblems = await db
    .select({
      epId: mockExamProblems.id,
      answer: mockExamProblems.answer,
      pointValue: mockExamProblems.pointValue,
      problemId: mockExamProblems.problemId,
    })
    .from(mockExamProblems)
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

    // Look up correct answer from filesystem
    const problem = getProblemFull(ep.problemId);
    const correctAnswer = problem?.correctAnswer ?? "A";

    const isBlank = !ep.answer || ep.answer === "N";
    const isCorrect =
      !isBlank &&
      ep.answer?.toUpperCase() === correctAnswer.toUpperCase();

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
          context: "simulation",
          solvedAt: isCorrect ? new Date() : null,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  if (numCorrect > 0) {
    await updateStreakOnCorrectSolve(userId);
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

  // Recalculate analytics in the background (fire-and-forget)
  recalculateAnalytics(userId).catch(() => {});

  return NextResponse.json({ examId: id });
}
