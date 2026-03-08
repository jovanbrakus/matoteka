import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

/**
 * Recalculates all analytics for a given user and upserts into user_analytics.
 * Called synchronously after test simulation completion or problem solve.
 *
 * Algorithm (from spec 12.7):
 * 1. Accuracy = correct / total attempted * 100
 * 2. Avg solve time from timed exams (time_spent / num_problems per exam)
 * 3. Percentile rank among all users with >= 10 attempts
 * 4. Category breakdown from problem_progress JOIN problem_topics
 * 5. Strengths = top 3 categories >= 70%, Weaknesses = bottom 3
 * 6. Trend = weekly rolling average of exam scores over last 12 weeks
 */
export async function recalculateAnalytics(userId: string): Promise<void> {
  // 1. Accuracy: correct / total attempted * 100
  const accuracyResult = await db.execute(sql`
    SELECT
      COUNT(*) FILTER (WHERE is_correct = true) AS correct_count,
      COUNT(*) AS total_count
    FROM problem_progress
    WHERE user_id = ${userId} AND status != 'unseen'
  `);
  const correctCount = Number(accuracyResult.rows[0]?.correct_count ?? 0);
  const totalCount = Number(accuracyResult.rows[0]?.total_count ?? 0);
  const accuracy = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;

  // 2. Average solve time (from timed, completed exams)
  const avgTimeResult = await db.execute(sql`
    SELECT
      AVG(
        CASE WHEN (num_correct + num_wrong + num_blank) > 0
        THEN time_spent::float / (num_correct + num_wrong + num_blank)
        ELSE NULL END
      ) AS avg_time_per_problem,
      COUNT(*) AS exam_count
    FROM mock_exams
    WHERE user_id = ${userId}
      AND mode = 'timed'
      AND status = 'completed'
      AND time_spent IS NOT NULL
  `);
  const avgSolveTimeSec = avgTimeResult.rows[0]?.avg_time_per_problem
    ? Math.round(Number(avgTimeResult.rows[0].avg_time_per_problem))
    : 0;

  // Total simulations (all completed exams, not just timed)
  const totalSimsResult = await db.execute(sql`
    SELECT COUNT(*) AS count
    FROM mock_exams
    WHERE user_id = ${userId} AND status = 'completed'
  `);
  const totalSimulations = Number(totalSimsResult.rows[0]?.count ?? 0);

  // 3. Percentile rank among all users with >= 10 attempts
  let percentileRank = 0;
  if (totalCount >= 10) {
    const percentileResult = await db.execute(sql`
      WITH user_accuracies AS (
        SELECT
          user_id,
          (COUNT(*) FILTER (WHERE is_correct = true))::float / NULLIF(COUNT(*), 0) * 100 AS acc
        FROM problem_progress
        WHERE status != 'unseen'
        GROUP BY user_id
        HAVING COUNT(*) >= 10
      )
      SELECT
        COUNT(*) FILTER (WHERE acc < ${accuracy}) AS users_below,
        COUNT(*) AS total_users
      FROM user_accuracies
    `);
    const usersBelow = Number(percentileResult.rows[0]?.users_below ?? 0);
    const totalUsers = Number(percentileResult.rows[0]?.total_users ?? 1);
    percentileRank = totalUsers > 0 ? (usersBelow / totalUsers) * 100 : 0;
  }

  // 4. Category breakdown from problem_progress JOIN problem_topics
  const categoryResult = await db.execute(sql`
    SELECT
      t.id AS topic_id,
      t.name AS topic_name,
      COUNT(*) FILTER (WHERE pp.is_correct = true) AS correct,
      COUNT(*) AS total
    FROM problem_progress pp
    JOIN problem_topics pt ON pt.problem_id = pp.problem_id
    JOIN topics t ON t.id = pt.topic_id
    WHERE pp.user_id = ${userId} AND pp.status != 'unseen'
    GROUP BY t.id, t.name
    ORDER BY t.sort_order
  `);

  const categoryBreakdown: Record<string, { name: string; correct: number; total: number; percent: number }> = {};
  for (const row of categoryResult.rows) {
    const total = Number(row.total);
    const correct = Number(row.correct);
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    categoryBreakdown[row.topic_id as string] = {
      name: row.topic_name as string,
      correct,
      total,
      percent,
    };
  }

  // 5. Strengths & weaknesses
  const sortedCategories = Object.entries(categoryBreakdown)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.percent - a.percent);

  const strengths = sortedCategories
    .filter((c) => c.percent >= 70)
    .slice(0, 3)
    .map((c) => ({ id: c.id, name: c.name, percent: c.percent }));

  const weaknesses = sortedCategories
    .filter((c) => c.total > 0)
    .reverse()
    .slice(0, 3)
    .filter((c) => c.percent < 70 || sortedCategories.length <= 3)
    .map((c) => ({ id: c.id, name: c.name, percent: c.percent }));

  // 6. Trend data: weekly rolling average of exam scores over last 12 weeks
  const trendResult = await db.execute(sql`
    SELECT
      date_trunc('week', finished_at) AS week_start,
      AVG(score_percent::numeric) AS avg_score,
      COUNT(*) AS exam_count
    FROM mock_exams
    WHERE user_id = ${userId}
      AND status = 'completed'
      AND finished_at >= NOW() - INTERVAL '12 weeks'
      AND score_percent IS NOT NULL
    GROUP BY date_trunc('week', finished_at)
    ORDER BY week_start ASC
  `);

  const trendData = trendResult.rows.map((row) => ({
    week: row.week_start,
    avgScore: Math.round(Number(row.avg_score) * 10) / 10,
    examCount: Number(row.exam_count),
  }));

  // 7. Upsert into user_analytics
  await db.execute(sql`
    INSERT INTO user_analytics (
      user_id, accuracy_percent, avg_solve_time_sec, percentile_rank,
      total_simulations, problems_solved, problems_attempted,
      category_breakdown, strengths, weaknesses, trend_data, updated_at
    )
    VALUES (
      ${userId},
      ${accuracy.toFixed(2)},
      ${avgSolveTimeSec},
      ${percentileRank.toFixed(2)},
      ${totalSimulations},
      ${correctCount},
      ${totalCount},
      ${JSON.stringify(categoryBreakdown)}::jsonb,
      ${JSON.stringify(strengths)}::jsonb,
      ${JSON.stringify(weaknesses)}::jsonb,
      ${JSON.stringify(trendData)}::jsonb,
      NOW()
    )
    ON CONFLICT (user_id)
    DO UPDATE SET
      accuracy_percent = EXCLUDED.accuracy_percent,
      avg_solve_time_sec = EXCLUDED.avg_solve_time_sec,
      percentile_rank = EXCLUDED.percentile_rank,
      total_simulations = EXCLUDED.total_simulations,
      problems_solved = EXCLUDED.problems_solved,
      problems_attempted = EXCLUDED.problems_attempted,
      category_breakdown = EXCLUDED.category_breakdown,
      strengths = EXCLUDED.strengths,
      weaknesses = EXCLUDED.weaknesses,
      trend_data = EXCLUDED.trend_data,
      updated_at = NOW()
  `);
}
