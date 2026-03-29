import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  numeric,
  date,
  timestamp,
  jsonb,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  googleId: varchar("google_id", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  displayName: varchar("display_name", { length: 50 }).notNull(),
  avatarUrl: text("avatar_url"),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: varchar("role", { length: 10 }).notNull().default("student"),
  targetFaculties: jsonb("target_faculties").default([]),
  streakCurrent: integer("streak_current").notNull().default(0),
  streakBest: integer("streak_best").notNull().default(0),
  lastActiveDate: date("last_active_date"),
  dailyGoal: integer("daily_goal").notNull().default(3),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const faculties = pgTable("faculties", {
  id: varchar("id", { length: 20 }).primaryKey(),
  university: varchar("university", { length: 200 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  shortName: varchar("short_name", { length: 50 }).notNull(),
  examDuration: integer("exam_duration").notNull(),
  examNumProblems: integer("exam_num_problems").notNull(),
  examNumOptions: integer("exam_num_options").notNull().default(5),
  scoringCorrect: numeric("scoring_correct", { precision: 4, scale: 2 }).notNull().default("1.0"),
  scoringWrong: numeric("scoring_wrong", { precision: 4, scale: 2 }).notNull().default("0.0"),
  scoringBlank: numeric("scoring_blank", { precision: 4, scale: 2 }).notNull().default("0.0"),
  examDate: date("exam_date"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const seasons = pgTable("seasons", {
  id: varchar("id", { length: 10 }).primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  examPeriodStart: date("exam_period_start").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const bookmarks = pgTable(
  "bookmarks",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 20 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.problemId] })]
);

export const problemProgress = pgTable(
  "problem_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 20 }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("unseen"),
    attempts: integer("attempts").notNull().default(0),
    lastAnswer: varchar("last_answer", { length: 10 }),
    isCorrect: boolean("is_correct"),
    context: varchar("context", { length: 20 }).notNull().default("practice"),
    solvedAt: timestamp("solved_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.problemId] })]
);

export const mockExams = pgTable(
  "mock_exams",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    facultyId: varchar("faculty_id", { length: 20 })
      .notNull()
      .references(() => faculties.id),
    testSize: varchar("test_size", { length: 20 }).notNull().default("full"),
    mode: varchar("mode", { length: 20 }).notNull().default("timed"),
    status: varchar("status", { length: 20 }).notNull().default("in_progress"),
    durationLimit: integer("duration_limit"),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    timeSpent: integer("time_spent"),
    score: numeric("score", { precision: 6, scale: 2 }),
    maxScore: numeric("max_score", { precision: 6, scale: 2 }),
    scorePercent: numeric("score_percent", { precision: 5, scale: 2 }),
    numCorrect: integer("num_correct").default(0),
    numWrong: integer("num_wrong").default(0),
    numBlank: integer("num_blank").default(0),
  },
  (table) => [
    index("idx_mock_exams_user").on(table.userId),
    index("idx_mock_exams_faculty").on(table.facultyId),
    index("idx_mock_exams_status").on(table.status),
  ]
);

export const mockExamProblems = pgTable(
  "mock_exam_problems",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    examId: uuid("exam_id")
      .notNull()
      .references(() => mockExams.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 20 }).notNull(),
    position: integer("position").notNull(),
    pointValue: numeric("point_value", { precision: 4, scale: 2 }).notNull(),
    answer: varchar("answer", { length: 10 }),
    isCorrect: boolean("is_correct"),
    isFlagged: boolean("is_flagged").notNull().default(false),
    answeredAt: timestamp("answered_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("unq_exam_position").on(table.examId, table.position),
    index("idx_exam_problems_exam").on(table.examId),
  ]
);

export const leaderboardScores = pgTable(
  "leaderboard_scores",
  {
    userId: uuid("user_id")
      .primaryKey()
      .references(() => users.id),
    displayName: varchar("display_name", { length: 50 }).notNull(),
    totalScore: numeric("total_score", { precision: 10, scale: 2 }).notNull().default("0"),
    problemsSolved: integer("problems_solved").notNull().default(0),
    examsCompleted: integer("exams_completed").notNull().default(0),
    avgExamPercent: numeric("avg_exam_percent", { precision: 5, scale: 2 }).default("0"),
    bestExamPercent: numeric("best_exam_percent", { precision: 5, scale: 2 }).default("0"),
    streakBest: integer("streak_best").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_leaderboard_total").on(table.totalScore),
  ]
);

export const aiSolutions = pgTable(
  "ai_solutions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    contextType: varchar("context_type", { length: 20 }).notNull(),
    sourceProblemId: varchar("source_problem_id", { length: 20 }),
    title: varchar("title", { length: 255 }).notNull(),
    promptText: text("prompt_text"),
    hadScreenshot: boolean("had_screenshot").notNull().default(false),
    contextHint: text("context_hint"),
    htmlContent: text("html_content").notNull(),
    llmProvider: varchar("llm_provider", { length: 20 }).notNull(),
    llmModel: varchar("llm_model", { length: 50 }).notNull(),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    costUsd: numeric("cost_usd", { precision: 10, scale: 6 }).notNull().default("0"),
    latencyMs: integer("latency_ms"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_ai_solutions_user").on(table.userId),
    index("idx_ai_solutions_created").on(table.createdAt),
    index("idx_ai_solutions_source").on(table.sourceProblemId),
  ]
);

export const aiDailyUsage = pgTable(
  "ai_daily_usage",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    date: date("date").notNull().defaultNow(),
    count: integer("count").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.userId, table.date] })]
);

export const solutionViews = pgTable(
  "solution_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 20 }).notNull(),
    viewedAt: timestamp("viewed_at", { withTimezone: true }).defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
  },
  (table) => [
    index("idx_solution_views_user").on(table.userId),
    index("idx_solution_views_user_date").on(table.userId, table.viewedAt),
    index("idx_solution_views_problem").on(table.problemId),
  ]
);

export const solutionDailyUsage = pgTable(
  "solution_daily_usage",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    date: date("date").notNull().defaultNow(),
    count: integer("count").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.userId, table.date] })]
);

export const userAnalytics = pgTable("user_analytics", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id),
  accuracyPercent: numeric("accuracy_percent", { precision: 5, scale: 2 }).default("0"),
  avgSolveTimeSec: integer("avg_solve_time_sec").default(0),
  percentileRank: numeric("percentile_rank", { precision: 5, scale: 2 }).default("0"),
  totalSimulations: integer("total_simulations").default(0),
  problemsSolved: integer("problems_solved").default(0),
  problemsAttempted: integer("problems_attempted").default(0),
  categoryBreakdown: jsonb("category_breakdown").default({}),
  strengths: jsonb("strengths").default([]),
  weaknesses: jsonb("weaknesses").default([]),
  trendData: jsonb("trend_data").default([]),
  readinessScore: numeric("readiness_score", { precision: 5, scale: 2 }).default("0"),
  readinessBreakdown: jsonb("readiness_breakdown").default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
