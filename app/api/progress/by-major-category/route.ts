import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { problemProgress, problemTopics, problems, topics } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import {
  MAJOR_CATEGORIES,
  getMajorCategoryFromTopic,
  majorCategoryLabel,
  majorCategoryOrder,
} from "@/lib/major-categories";

interface ByTopicRow {
  topicId: string;
  topicName: string;
  total: string;
  solved: string;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as any).id;

  const rows = await db
    .select({
      topicId: topics.id,
      topicName: topics.name,
      total: sql<string>`count(distinct ${problems.id})`,
      solved: sql<string>`count(distinct case when ${problemProgress.status} = 'solved' then ${problems.id} end)`,
    })
    .from(topics)
    .innerJoin(problemTopics, eq(problemTopics.topicId, topics.id))
    .innerJoin(problems, and(eq(problemTopics.problemId, problems.id), eq(problems.isPublished, true)))
    .leftJoin(
      problemProgress,
      and(eq(problemProgress.problemId, problemTopics.problemId), eq(problemProgress.userId, userId)),
    )
    .groupBy(topics.id, topics.name)
    .orderBy(topics.name);

  const byTopicRows = rows as unknown as ByTopicRow[];

  const init = new Map<string, { id: string; name: string; solved: number; total: number }>();
  MAJOR_CATEGORIES.forEach((cat) => {
    init.set(cat.id, { id: cat.id, name: cat.name, solved: 0, total: 0 });
  });

  for (const row of byTopicRows) {
    const categoryId = getMajorCategoryFromTopic(row.topicId);
    if (!categoryId) continue;

    const target = init.get(categoryId);
    if (!target) continue;

    target.total += Number(row.total || 0);
    target.solved += Number(row.solved || 0);
  }

  const result = majorCategoryOrder
    .map((id) => init.get(id)!)
    .filter(Boolean)
    .map((entry) => ({
      id: entry.id,
      name: majorCategoryLabel(entry.id),
      solved: entry.solved,
      total: entry.total,
    }));

  return NextResponse.json(result);
}
