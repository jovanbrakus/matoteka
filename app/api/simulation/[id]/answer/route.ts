import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockExams, mockExamProblems } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { id } = await params;

  const exam = await db
    .select({ status: mockExams.status })
    .from(mockExams)
    .where(and(eq(mockExams.id, id), eq(mockExams.userId, userId)))
    .limit(1);

  if (exam.length === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (exam[0].status !== "in_progress")
    return NextResponse.json({ error: "Exam is not in progress" }, { status: 409 });

  const { problemId, answer } = await req.json();

  await db
    .update(mockExamProblems)
    .set({ answer, answeredAt: new Date() })
    .where(
      and(eq(mockExamProblems.examId, id), eq(mockExamProblems.id, problemId))
    );

  return NextResponse.json({ ok: true });
}
