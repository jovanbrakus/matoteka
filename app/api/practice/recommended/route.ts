import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  problemTopics,
} from "@/drizzle/schema";
import { sql, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

// Category group definitions (same as categories route)
const CATEGORY_GROUPS: Record<string, { name: string; topicIds: string[] }> = {
  algebra: {
    name: "Algebra",
    topicIds: [
      "algebra", "linearna_algebra", "jednacine", "nejednacine",
      "trigonometrija", "kompleksni_brojevi", "polinomi",
      "nizovi_i_redovi", "logaritmi", "eksponencijalne_funkcije",
    ],
  },
  geometrija: {
    name: "Geometrija",
    topicIds: [
      "geometrija", "analiticka_geometrija", "planimetrija",
      "stereometrija", "trigonometrija_geometrija", "vektori",
    ],
  },
  verovatnoca: {
    name: "Verovatnoca",
    topicIds: [
      "verovatnoca", "kombinatorika", "statistika",
    ],
  },
  logika: {
    name: "Logika",
    topicIds: [
      "logika", "skupovi", "matematicka_indukcija", "teorija_brojeva",
    ],
  },
};

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Step 1: Calculate knowledge per category (with recency weighting)
  const progressResult = await db.execute(sql`
    SELECT
      pt.topic_id,
      pp.is_correct,
      pp.updated_at
    FROM problem_progress pp
    JOIN problem_topics pt ON pt.problem_id = pp.problem_id
    WHERE pp.user_id = ${userId}
      AND pp.status != 'unseen'
  `);

  // Build per-category knowledge scores using exponential decay
  const categoryKnowledge: Record<string, number | null> = {};
  const categoryLastPractice: Record<string, Date | null> = {};

  for (const [categoryId, group] of Object.entries(CATEGORY_GROUPS)) {
    let weightedCorrect = 0;
    let weightedTotal = 0;
    let lastPracticeDate: Date | null = null;

    for (const row of progressResult.rows) {
      const topicId = row.topic_id as string;
      if (!group.topicIds.includes(topicId)) continue;

      const updatedAt = new Date(row.updated_at as string);
      const daysAgo = Math.max(0, (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
      const weight = Math.pow(0.95, daysAgo); // half-life ~14 days

      weightedTotal += weight;
      if (row.is_correct) {
        weightedCorrect += weight;
      }

      if (!lastPracticeDate || updatedAt > lastPracticeDate) {
        lastPracticeDate = updatedAt;
      }
    }

    categoryKnowledge[categoryId] = weightedTotal > 0
      ? (weightedCorrect / weightedTotal) * 100
      : null;
    categoryLastPractice[categoryId] = lastPracticeDate;
  }

  // Step 2: Calculate weakness scores
  const weaknessScores: Record<string, number> = {};
  for (const categoryId of Object.keys(CATEGORY_GROUPS)) {
    const knowledge = categoryKnowledge[categoryId];
    if (knowledge === null) {
      weaknessScores[categoryId] = 100; // never tried = highest priority
    } else {
      weaknessScores[categoryId] = 100 - knowledge;
    }

    // Recency boost
    const lastPractice = categoryLastPractice[categoryId];
    if (lastPractice) {
      const daysSince = Math.max(0, (Date.now() - lastPractice.getTime()) / (1000 * 60 * 60 * 24));
      weaknessScores[categoryId] += Math.min(20, daysSince * 2);
    } else {
      weaknessScores[categoryId] += 20; // never practiced = max boost
    }
  }

  // Step 3: Find recommended category (highest weakness score)
  let recommendedCategoryId = "algebra";
  let highestScore = -1;
  for (const [categoryId, score] of Object.entries(weaknessScores)) {
    if (score > highestScore) {
      highestScore = score;
      recommendedCategoryId = categoryId;
    }
  }

  const recommendedCategory = CATEGORY_GROUPS[recommendedCategoryId];
  const topicIds = recommendedCategory.topicIds;

  // Step 4: Select problems from recommended category using parameterized query
  // Get problem IDs in this category
  const categoryProblemIds = await db
    .selectDistinct({ problemId: problemTopics.problemId })
    .from(problemTopics)
    .where(inArray(problemTopics.topicId, topicIds));

  const pIds = categoryProblemIds.map((r) => r.problemId);

  let recommendedProblems: any[] = [];

  if (pIds.length > 0) {
    // Get unseen or failed problems, sorted by difficulty ASC
    recommendedProblems = await db.execute(sql`
      SELECT DISTINCT
        p.id,
        p.slug,
        p.title,
        p.faculty_id,
        p.year,
        p.problem_number,
        p.difficulty,
        p.num_options,
        pp.is_correct,
        pp.status as progress_status
      FROM problems p
      LEFT JOIN problem_progress pp ON pp.problem_id = p.id AND pp.user_id = ${userId}
      WHERE p.is_published = true
        AND p.id = ANY(${pIds})
        AND (pp.is_correct IS NULL OR pp.is_correct = false)
      ORDER BY
        CASE WHEN pp.status IS NULL THEN 0 ELSE 1 END,
        COALESCE(p.difficulty, 5.0) ASC
      LIMIT 5
    `).then(r => r.rows);

    // If all problems in category are solved correctly, pick ones they got wrong for retry
    if (recommendedProblems.length === 0) {
      recommendedProblems = await db.execute(sql`
        SELECT DISTINCT
          p.id,
          p.slug,
          p.title,
          p.faculty_id,
          p.year,
          p.problem_number,
          p.difficulty,
          p.num_options,
          pp.is_correct,
          pp.status as progress_status
        FROM problems p
        LEFT JOIN problem_progress pp ON pp.problem_id = p.id AND pp.user_id = ${userId}
        WHERE p.is_published = true
          AND p.id = ANY(${pIds})
        ORDER BY pp.updated_at ASC NULLS FIRST
        LIMIT 5
      `).then(r => r.rows);
    }
  }

  return NextResponse.json({
    recommendedCategory: {
      id: recommendedCategoryId,
      name: recommendedCategory.name,
      knowledgePercent: categoryKnowledge[recommendedCategoryId] !== null
        ? Math.round(categoryKnowledge[recommendedCategoryId]!)
        : 0,
      weaknessScore: Math.round(weaknessScores[recommendedCategoryId]),
    },
    problems: recommendedProblems.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      facultyId: p.faculty_id,
      year: p.year,
      problemNumber: p.problem_number,
      difficulty: p.difficulty,
      numOptions: p.num_options,
    })),
    weaknessScores,
  });
}
