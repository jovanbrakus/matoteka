import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockExamProblems } from "@/drizzle/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { problemId } = await req.json();

  await db
    .update(mockExamProblems)
    .set({ isFlagged: sql`NOT ${mockExamProblems.isFlagged}` })
    .where(
      and(eq(mockExamProblems.examId, id), eq(mockExamProblems.id, problemId))
    );

  return NextResponse.json({ ok: true });
}
