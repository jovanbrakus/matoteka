import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockExams, faculties } from "@/drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const page = Math.max(parseInt(searchParams.get("page") || "1") || 1, 1);
  const perPage = Math.min(parseInt(searchParams.get("perPage") || "10") || 10, 50);
  const search = searchParams.get("search") || "";
  const typeFilter = searchParams.get("type") || "";
  const statusFilter = searchParams.get("status") || "";

  // Build conditions
  const conditions = [eq(mockExams.userId, userId), eq(mockExams.status, "completed")];
  if (typeFilter) {
    conditions.push(eq(mockExams.testSize, typeFilter));
  }

  // Get total count
  const [totalRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(mockExams)
    .where(and(...conditions));

  const total = Number(totalRow.count);

  // Get paginated results
  const result = await db
    .select({
      id: mockExams.id,
      testSize: mockExams.testSize,
      mode: mockExams.mode,
      facultyId: mockExams.facultyId,
      facultyName: faculties.shortName,
      status: mockExams.status,
      score: mockExams.score,
      maxScore: mockExams.maxScore,
      scorePercent: mockExams.scorePercent,
      numCorrect: mockExams.numCorrect,
      numWrong: mockExams.numWrong,
      numBlank: mockExams.numBlank,
      timeSpent: mockExams.timeSpent,
      durationLimit: mockExams.durationLimit,
      startedAt: mockExams.startedAt,
      finishedAt: mockExams.finishedAt,
    })
    .from(mockExams)
    .innerJoin(faculties, eq(mockExams.facultyId, faculties.id))
    .where(and(...conditions))
    .orderBy(desc(mockExams.startedAt))
    .limit(perPage)
    .offset((page - 1) * perPage);

  // Calculate summary stats
  const allCompleted = await db
    .select({
      scorePercent: mockExams.scorePercent,
      timeSpent: mockExams.timeSpent,
    })
    .from(mockExams)
    .where(and(eq(mockExams.userId, userId), eq(mockExams.status, "completed")));

  const totalTests = allCompleted.length;
  const avgScore =
    totalTests > 0
      ? allCompleted.reduce(
          (sum, e) => sum + parseFloat(e.scorePercent || "0"),
          0
        ) / totalTests
      : 0;
  const totalTime = allCompleted.reduce(
    (sum, e) => sum + (e.timeSpent || 0),
    0
  );

  return NextResponse.json({
    exams: result,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
    stats: {
      avgScore: avgScore.toFixed(0),
      totalTime,
      totalTests,
    },
  });
}
