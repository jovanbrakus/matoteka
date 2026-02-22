import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { mockExams, mockExamProblems, problems, faculties, users } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;

  // Read user's current targetFaculty from DB (always fresh)
  const [user] = await db
    .select({ targetFaculty: users.targetFaculty })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const targetFaculty = user?.targetFaculty;

  // Get faculty config — fall back to first available faculty if user has "other" or none
  let fac = targetFaculty && targetFaculty !== "other"
    ? await db.select().from(faculties).where(eq(faculties.id, targetFaculty)).limit(1)
    : [];

  if (fac.length === 0) {
    fac = await db.select().from(faculties).limit(1);
  }

  if (fac.length === 0) {
    return NextResponse.json({ error: "Nema dostupnih fakulteta" }, { status: 400 });
  }

  const faculty = fac[0];
  const numProblems = faculty.examNumProblems;
  const durationSeconds = faculty.examDuration * 60;
  const facultyId = faculty.id;

  // Select random problems from ALL faculties (math is shared)
  const availableProblems = await db
    .select({ id: problems.id })
    .from(problems)
    .where(eq(problems.isPublished, true))
    .orderBy(sql`RANDOM()`)
    .limit(numProblems);

  if (availableProblems.length === 0) {
    return NextResponse.json({ error: "Nema dostupnih zadataka" }, { status: 400 });
  }

  // Create exam
  const [exam] = await db.insert(mockExams).values({
    userId,
    facultyId,
    durationLimit: durationSeconds,
    status: "in_progress",
  }).returning();

  // Create exam problems
  const examProblemValues = availableProblems.map((p, i) => ({
    examId: exam.id,
    problemId: p.id,
    position: i + 1,
  }));

  await db.insert(mockExamProblems).values(examProblemValues);

  return NextResponse.json({ examId: exam.id });
}
