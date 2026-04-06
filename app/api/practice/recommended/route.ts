import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getAllMeta, getCategoryGroups, getProblemFull, type ProblemMeta } from "@/lib/problems";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const categoryGroups = getCategoryGroups();

  // Step 1: Get all user progress from DB
  const progressResult = await db.execute(sql`
    SELECT
      problem_id,
      is_correct,
      updated_at
    FROM problem_progress
    WHERE user_id = ${userId}
      AND status != 'unseen'
  `);

  // Build a map of id -> progress for quick lookup
  const progressById = new Map<string, { isCorrect: boolean; updatedAt: Date }>();
  for (const row of progressResult.rows) {
    progressById.set(row.problem_id as string, {
      isCorrect: row.is_correct as boolean,
      updatedAt: new Date(row.updated_at as string),
    });
  }

  // Build a map of id -> category from the problems index
  const allProblems = getAllMeta();
  const idToCategory = new Map<string, string>();
  for (const p of allProblems) {
    if (p.category) {
      idToCategory.set(p.id, p.category);
    }
  }

  // Step 2: Calculate knowledge per category group (with recency weighting)
  const categoryKnowledge: Record<string, number | null> = {};
  const categoryLastPractice: Record<string, Date | null> = {};

  for (const group of categoryGroups) {
    const categorySet = new Set(group.categories);
    let weightedCorrect = 0;
    let weightedTotal = 0;
    let lastPracticeDate: Date | null = null;

    for (const [id, progress] of progressById) {
      const cat = idToCategory.get(id);
      if (!cat || !categorySet.has(cat)) continue;

      const daysAgo = Math.max(0, (Date.now() - progress.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
      const weight = Math.pow(0.95, daysAgo); // half-life ~14 days

      weightedTotal += weight;
      if (progress.isCorrect) {
        weightedCorrect += weight;
      }

      if (!lastPracticeDate || progress.updatedAt > lastPracticeDate) {
        lastPracticeDate = progress.updatedAt;
      }
    }

    categoryKnowledge[group.id] = weightedTotal > 0
      ? (weightedCorrect / weightedTotal) * 100
      : null;
    categoryLastPractice[group.id] = lastPracticeDate;
  }

  // Step 3: Calculate weakness scores
  const weaknessScores: Record<string, number> = {};
  for (const group of categoryGroups) {
    const knowledge = categoryKnowledge[group.id];
    if (knowledge === null) {
      weaknessScores[group.id] = 100; // never tried = highest priority
    } else {
      weaknessScores[group.id] = 100 - knowledge;
    }

    // Recency boost
    const lastPractice = categoryLastPractice[group.id];
    if (lastPractice) {
      const daysSince = Math.max(0, (Date.now() - lastPractice.getTime()) / (1000 * 60 * 60 * 24));
      weaknessScores[group.id] += Math.min(20, daysSince * 2);
    } else {
      weaknessScores[group.id] += 20; // never practiced = max boost
    }
  }

  // Step 4: Find recommended category group (highest weakness score)
  let recommendedGroupId = categoryGroups[0]?.id ?? "algebra";
  let highestScore = -1;
  for (const [groupId, score] of Object.entries(weaknessScores)) {
    if (score > highestScore) {
      highestScore = score;
      recommendedGroupId = groupId;
    }
  }

  const recommendedGroup = categoryGroups.find((g) => g.id === recommendedGroupId)!;
  const groupCategorySet = new Set(recommendedGroup.categories);

  // Step 5: Select problems from recommended category group
  // Filter all problems that belong to one of this group's categories
  const categoryProblems = allProblems.filter(
    (p) => p.category && groupCategorySet.has(p.category)
  );

  // Separate into unseen/failed and solved
  const unseenOrFailed: ProblemMeta[] = [];
  const solvedProblems: ProblemMeta[] = [];

  for (const p of categoryProblems) {
    const progress = progressById.get(p.id);
    if (!progress || !progress.isCorrect) {
      unseenOrFailed.push(p);
    } else {
      solvedProblems.push(p);
    }
  }

  // Sort unseen first (no progress), then failed, then by difficulty ASC
  unseenOrFailed.sort((a, b) => {
    const aUnseen = !progressById.get(a.id) ? 0 : 1;
    const bUnseen = !progressById.get(b.id) ? 0 : 1;
    if (aUnseen !== bUnseen) return aUnseen - bUnseen;
    return (a.difficulty ?? 5) - (b.difficulty ?? 5);
  });

  let recommendedProblems = unseenOrFailed.slice(0, 5);

  // If all problems in category are solved, pick least recently practiced for retry
  if (recommendedProblems.length === 0) {
    solvedProblems.sort((a, b) => {
      const aTime = progressById.get(a.id)?.updatedAt.getTime() ?? 0;
      const bTime = progressById.get(b.id)?.updatedAt.getTime() ?? 0;
      return aTime - bTime; // oldest first
    });
    recommendedProblems = solvedProblems.slice(0, 5);
  }

  return NextResponse.json({
    recommendedCategory: {
      id: recommendedGroupId,
      name: recommendedGroup.sr,
      knowledgePercent: categoryKnowledge[recommendedGroupId] !== null
        ? Math.round(categoryKnowledge[recommendedGroupId]!)
        : 0,
      weaknessScore: Math.round(weaknessScores[recommendedGroupId]),
    },
    problems: recommendedProblems.map((p) => {
      const full = getProblemFull(p.id);
      return {
        id: p.id,
        title: full?.title ?? `Zadatak ${p.problemNumber}`,
        facultyId: p.facultyId,
        year: p.year,
        problemNumber: p.problemNumber,
        difficulty: p.difficulty,
        numOptions: full?.numOptions ?? 5,
      };
    }),
    weaknessScores,
  });
}
