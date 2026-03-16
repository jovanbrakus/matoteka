import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProblemFull } from "@/lib/problems";
import { updateStreakOnCorrectSolve } from "@/lib/streak";
import { recalculateAnalytics } from "@/lib/analytics";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { problemId } = await params;
  const body = await req.json();
  const { answer } = body;

  if (!answer) {
    return NextResponse.json({ error: "Answer is required" }, { status: 400 });
  }

  const problem = getProblemFull(problemId);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const isCorrect = answer === problem.correctAnswer;
  const status = isCorrect ? "solved" : "attempted";

  await db
    .insert(problemProgress)
    .values({
      userId,
      problemId,
      status,
      attempts: 1,
      lastAnswer: answer,
      isCorrect,
      solvedAt: isCorrect ? new Date() : null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [problemProgress.userId, problemProgress.problemId],
      set: {
        status: isCorrect
          ? "solved"
          : sql`CASE WHEN ${problemProgress.status} = 'solved' THEN 'solved' ELSE 'attempted' END`,
        attempts: sql`${problemProgress.attempts} + 1`,
        lastAnswer: answer,
        isCorrect: isCorrect || sql`${problemProgress.isCorrect}`,
        solvedAt: isCorrect ? new Date() : sql`${problemProgress.solvedAt}`,
        updatedAt: new Date(),
      },
    });

  if (isCorrect) {
    await updateStreakOnCorrectSolve(userId);
  }

  // Recalculate analytics in the background (fire-and-forget)
  recalculateAnalytics(userId).catch(() => {});

  return NextResponse.json({
    isCorrect,
    correctAnswer: problem.correctAnswer,
    status,
  });
}
