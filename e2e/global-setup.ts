import { execSync } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { FACULTIES, TEST_STUDENT, TEST_ADMIN } from "./fixtures/test-data";

export default async function globalSetup() {
  dotenv.config({ path: path.resolve(__dirname, ".env.e2e") });

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not set in e2e/.env.e2e");
  }

  console.log("[E2E] Pushing schema to E2E database...");
  execSync("npx drizzle-kit push --force", {
    cwd: path.resolve(__dirname, ".."),
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: "pipe",
  });

  const sql = neon(databaseUrl);

  console.log("[E2E] Truncating all tables...");
  await sql`TRUNCATE TABLE solution_views, solution_daily_usage, user_analytics, leaderboard_scores, mock_exam_problems, mock_exams, problem_progress, bookmarks, users, faculties CASCADE`;

  console.log("[E2E] Seeding faculties...");
  for (const f of FACULTIES) {
    await sql`
      INSERT INTO faculties (id, university, name, short_name, exam_duration, exam_num_problems, exam_num_options, scoring_correct, scoring_wrong, scoring_blank, description)
      VALUES (${f.id}, ${f.university}, ${f.name}, ${f.shortName}, ${f.examDuration}, ${f.examNumProblems}, ${f.examNumOptions}, ${f.scoringCorrect}, ${f.scoringWrong}, ${f.scoringBlank}, ${f.description})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  console.log("[E2E] Seeding test users...");
  const studentHash = await bcrypt.hash(TEST_STUDENT.password, 10);
  const adminHash = await bcrypt.hash(TEST_ADMIN.password, 10);

  await sql`
    INSERT INTO users (email, display_name, password_hash, role, target_faculties)
    VALUES (${TEST_STUDENT.email}, ${TEST_STUDENT.displayName}, ${studentHash}, 'student', '["etf"]'::jsonb)
    ON CONFLICT (email) DO NOTHING
  `;

  await sql`
    INSERT INTO users (email, display_name, password_hash, role, target_faculties)
    VALUES (${TEST_ADMIN.email}, ${TEST_ADMIN.displayName}, ${adminHash}, 'admin', '["etf"]'::jsonb)
    ON CONFLICT (email) DO NOTHING
  `;

  console.log("[E2E] Global setup complete.");
}
