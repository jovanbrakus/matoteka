import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// Main category groups for the practice page
const CATEGORY_GROUPS: Record<string, { name: string; icon: string; topicIds: string[] }> = {
  algebra: {
    name: "Algebra",
    icon: "function",
    topicIds: [
      "algebra",
      "linearna_algebra",
      "jednacine",
      "nejednacine",
      "trigonometrija",
      "kompleksni_brojevi",
      "polinomi",
      "nizovi_i_redovi",
      "logaritmi",
      "eksponencijalne_funkcije",
    ],
  },
  geometrija: {
    name: "Geometrija",
    icon: "change_history",
    topicIds: [
      "geometrija",
      "analiticka_geometrija",
      "planimetrija",
      "stereometrija",
      "trigonometrija_geometrija",
      "vektori",
    ],
  },
  verovatnoca: {
    name: "Verovatnoca",
    icon: "casino",
    topicIds: [
      "verovatnoca",
      "kombinatorika",
      "statistika",
    ],
  },
  logika: {
    name: "Logika",
    icon: "psychology",
    topicIds: [
      "logika",
      "skupovi",
      "matematicka_indukcija",
      "teorija_brojeva",
    ],
  },
};

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Get all topics with their problem counts and user progress
  const result = await db.execute(sql`
    SELECT
      t.id as topic_id,
      t.name as topic_name,
      COUNT(DISTINCT pt.problem_id) as total_problems,
      COUNT(DISTINCT CASE WHEN pp.is_correct = true THEN pt.problem_id END) as solved_correctly,
      COUNT(DISTINCT CASE WHEN pp.status IS NOT NULL AND pp.status != 'unseen' THEN pt.problem_id END) as attempted
    FROM topics t
    JOIN problem_topics pt ON pt.topic_id = t.id
    JOIN problems p ON p.id = pt.problem_id AND p.is_published = true
    LEFT JOIN problem_progress pp ON pp.problem_id = pt.problem_id AND pp.user_id = ${userId}
    GROUP BY t.id, t.name
    ORDER BY t.name
  `);

  const topicStats: Record<string, { total: number; solved: number; attempted: number }> = {};
  for (const row of result.rows) {
    topicStats[row.topic_id as string] = {
      total: Number(row.total_problems),
      solved: Number(row.solved_correctly),
      attempted: Number(row.attempted),
    };
  }

  // Aggregate into category groups
  const categories = Object.entries(CATEGORY_GROUPS).map(([id, group]) => {
    let totalProblems = 0;
    let solvedCorrectly = 0;
    let attempted = 0;

    for (const topicId of group.topicIds) {
      const stats = topicStats[topicId];
      if (stats) {
        totalProblems += stats.total;
        solvedCorrectly += stats.solved;
        attempted += stats.attempted;
      }
    }

    const progressPercent = totalProblems > 0
      ? Math.round((solvedCorrectly / totalProblems) * 100)
      : 0;

    return {
      id,
      name: group.name,
      icon: group.icon,
      topicIds: group.topicIds,
      totalProblems,
      solvedCorrectly,
      attempted,
      progressPercent,
    };
  });

  return NextResponse.json({ categories });
}
