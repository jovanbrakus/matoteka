import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress, problems } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

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

  // Fetch the problem to verify correctness server-side
  const problemResult = await db
    .select({
      id: problems.id,
      correctAnswer: problems.correctAnswer,
    })
    .from(problems)
    .where(and(eq(problems.id, problemId), eq(problems.isPublished, true)))
    .limit(1);

  if (problemResult.length === 0) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const problem = problemResult[0];
  const isCorrect = answer === problem.correctAnswer;
  const status = isCorrect ? "solved" : "attempted";

  // Record to problem_progress with context='practice'
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

  return NextResponse.json({
    isCorrect,
    correctAnswer: problem.correctAnswer,
    status,
  });
}
