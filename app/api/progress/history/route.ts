import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress, problems } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") || "20"), 50);

  const result = await db
    .select({
      slug: problems.slug,
      title: problems.title,
      facultyId: problems.facultyId,
      year: problems.year,
      problemNumber: problems.problemNumber,
      status: problemProgress.status,
      isCorrect: problemProgress.isCorrect,
      updatedAt: problemProgress.updatedAt,
    })
    .from(problemProgress)
    .innerJoin(problems, eq(problemProgress.problemId, problems.id))
    .where(eq(problemProgress.userId, userId))
    .orderBy(desc(problemProgress.updatedAt))
    .limit(limit);

  return NextResponse.json(result);
}
