import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  mockExams,
  mockExamProblems,
  problems,
  faculties,
  users,
  problemProgress,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Full 20-problem point values (position 1..20)
const FULL_TEST_POINTS: Record<number, number> = {
  1: 3, 2: 3, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4,
  8: 5, 9: 5, 10: 5, 11: 5, 12: 5, 13: 5,
  14: 6, 15: 6, 16: 6, 17: 6, 18: 6,
  19: 7, 20: 7,
};

// Time limits in minutes for 20 problems = 180 min
const FULL_TEST_DURATION_MINUTES = 180;

function getPointValues(testSize: number): number[] {
  if (testSize === 20) {
    return Array.from({ length: 20 }, (_, i) => FULL_TEST_POINTS[i + 1]);
  }
  // Interpolate for shorter tests
  const points: number[] = [];
  for (let i = 1; i <= testSize; i++) {
    const mappedPosition = Math.round(((i - 1) * 19) / (testSize - 1)) + 1;
    points.push(FULL_TEST_POINTS[mappedPosition]);
  }
  return points;
}

function getDurationMinutes(testSize: number): number {
  return Math.round((testSize / 20) * FULL_TEST_DURATION_MINUTES);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;
  const body = await req.json();
  const testSize = body.testSize as number; // 20, 14, or 8
  const mode = body.mode as string; // "timed" or "untimed"

  if (![20, 14, 8].includes(testSize)) {
    return NextResponse.json({ error: "Neispravna veličina testa" }, { status: 400 });
  }
  if (!["timed", "untimed"].includes(mode)) {
    return NextResponse.json({ error: "Neispravni režim" }, { status: 400 });
  }

  // Get user's target faculties
  const [user] = await db
    .select({ targetFaculties: users.targetFaculties })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const targetFaculties = (user?.targetFaculties as string[]) || [];
  const primaryFaculty = targetFaculties.find(f => f !== "other");

  let fac =
    primaryFaculty
      ? await db
          .select()
          .from(faculties)
          .where(eq(faculties.id, primaryFaculty))
          .limit(1)
      : [];

  if (fac.length === 0) {
    fac = await db.select().from(faculties).limit(1);
  }

  if (fac.length === 0) {
    return NextResponse.json(
      { error: "Nema dostupnih fakulteta" },
      { status: 400 }
    );
  }

  const faculty = fac[0];

  // Calculate point values and duration
  const pointValues = getPointValues(testSize);
  const durationMinutes = mode === "timed" ? getDurationMinutes(testSize) : null;
  const durationSeconds = durationMinutes ? durationMinutes * 60 : null;

  // Map test size to label
  const testSizeLabel =
    testSize === 20 ? "full" : testSize === 14 ? "medium" : "quick";

  // --- Problem Selection Algorithm (spec 12.1) ---

  // Get all published problems
  const allProblems = await db
    .select({
      id: problems.id,
      difficulty: problems.difficulty,
    })
    .from(problems)
    .where(eq(problems.isPublished, true));

  if (allProblems.length < testSize) {
    return NextResponse.json(
      { error: "Nedovoljno zadataka u bazi" },
      { status: 400 }
    );
  }

  // Get problems the user has already seen
  const seenProblems = await db
    .select({ problemId: problemProgress.problemId })
    .from(problemProgress)
    .where(eq(problemProgress.userId, userId));

  const seenIds = new Set(seenProblems.map((p) => p.problemId));

  // Classify problems by difficulty tier
  const parseDiff = (d: string | null) => (d ? parseFloat(d) : 5.0);

  const easyProblems = allProblems.filter((p) => parseDiff(p.difficulty) <= 3.0);
  const mediumProblems = allProblems.filter(
    (p) => parseDiff(p.difficulty) > 3.0 && parseDiff(p.difficulty) <= 6.0
  );
  const hardProblems = allProblems.filter((p) => parseDiff(p.difficulty) > 6.0);

  // Calculate tier sizes
  const easyCount = Math.round(testSize * 0.3);
  const hardCount = Math.round(testSize * 0.3);
  const mediumCount = testSize - easyCount - hardCount;

  // Priority: unseen first, then seen
  function selectFromPool(
    pool: typeof allProblems,
    count: number
  ): typeof allProblems {
    const unseen = pool.filter((p) => !seenIds.has(p.id));
    const seen = pool.filter((p) => seenIds.has(p.id));

    // Shuffle
    const shuffled = [...unseen].sort(() => Math.random() - 0.5);
    const seenShuffled = [...seen].sort(() => Math.random() - 0.5);

    const result = [...shuffled, ...seenShuffled].slice(0, count);
    return result;
  }

  let selected = [
    ...selectFromPool(easyProblems, easyCount),
    ...selectFromPool(mediumProblems, mediumCount),
    ...selectFromPool(hardProblems, hardCount),
  ];

  // If we didn't get enough from tiers, fill from all problems
  if (selected.length < testSize) {
    const selectedIds = new Set(selected.map((p) => p.id));
    const remaining = allProblems
      .filter((p) => !selectedIds.has(p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, testSize - selected.length);
    selected = [...selected, ...remaining];
  }

  // Sort by difficulty ascending for position assignment
  selected.sort((a, b) => parseDiff(a.difficulty) - parseDiff(b.difficulty));

  // Light shuffle within tiers (swap adjacent within same tier)
  for (let i = 1; i < selected.length - 1; i++) {
    if (Math.random() < 0.3) {
      const diffA = parseDiff(selected[i].difficulty);
      const diffB = parseDiff(selected[i + 1].difficulty);
      // Only swap if they're in the same tier
      const tierA = diffA <= 3 ? 0 : diffA <= 6 ? 1 : 2;
      const tierB = diffB <= 3 ? 0 : diffB <= 6 ? 1 : 2;
      if (tierA === tierB) {
        [selected[i], selected[i + 1]] = [selected[i + 1], selected[i]];
      }
    }
  }

  // Create exam record
  const [exam] = await db
    .insert(mockExams)
    .values({
      userId,
      facultyId: faculty.id,
      testSize: testSizeLabel,
      mode: mode === "timed" ? "timed" : "untimed",
      status: "in_progress",
      durationLimit: durationSeconds,
    })
    .returning();

  // Create exam problems with point values
  const examProblemValues = selected.map((p, i) => ({
    examId: exam.id,
    problemId: p.id,
    position: i + 1,
    pointValue: pointValues[i].toFixed(2),
  }));

  await db.insert(mockExamProblems).values(examProblemValues);

  return NextResponse.json({ examId: exam.id });
}
