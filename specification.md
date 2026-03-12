# Matoteka — Product Specification

**Version:** 2.0 (Season 2026)
**Date:** March 8, 2026

---

## 1. Overview

Matoteka is a learning platform for Serbian high school students preparing for university admission math exams. The platform offers 799+ solved problems from Belgrade university entrance exams, timed exam simulations, free practice, analytics, and a theory hub.

**Tech stack:** Next.js 16, PostgreSQL (Neon), NextAuth.js (Google OAuth + Credentials), Drizzle ORM, Tailwind v4.

**Brand:** Matoteka with brain logo, green/lime accent colors. Dark theme by default with light theme toggle.

---

## 2. Seasons

Time is divided into **seasons**. The current season is **Season 2026**.

- Season 2026 is in preparation mode
- The exam period starts when the first math admission exam begins (across all covered faculties)
- Current assumed start date: **June 15, 2026** (to be researched and updated)
- The dashboard always shows: "Sezona 2026" and a countdown like "45 dana do početka ispita"

---

## 3. User Onboarding & Faculty Selection

### 3.1 Authentication

- Google OAuth and email/password credentials
- JWT session strategy

### 3.2 Onboarding (First Login)

Every user **must** choose:
- A display name
- Their desired faculties: **up to 3 choices** from the available list, plus an **"Ostalo" (Other)** option
- This selection can be changed later from the profile page

### 3.3 Faculty Exam Dates

Each faculty has an associated admission exam date for the current season. Users should see on their dashboard when their chosen faculties' exams are scheduled (e.g., "ETF prijemni: 25. jun 2026").

---

## 4. V1 Features

### 4.1 Landing Page

**Reference:** `reference_designs/landing_page`

Keep as-is. Two purposes only:
- User acquisition (marketing)
- Login / sign-up entry point

### 4.2 User Dashboard (Main Logged-In Page)

**Reference:** `reference_designs/user_dashboard_alternative`

The main page after login. Must match the `user_dashboard_alternative` design 1:1, including:
- Daily goal tracker (e.g., "15/20 zadataka, 75% završeno")
- Last test score
- Countdown to exam ("DO PRIJEMNOG ISPITA: 42 dana 12h 05min")
- "Sezona 2026" label
- Main topic area cards (Algebra, Geometrija, Verovatnoća, Logika) with progress per topic
- Daily AI recommendation ("Preporuka za danas")
- Exam dates for user's chosen faculties

**Excluded from v1:** "Sledeća simulacija" card.

Users can launch free practice from topic cards on this page (choosing a recommended category or picking their own).

### 4.3 Navigation (Left Sidebar)

**Reference:** `reference_designs/user_dashboard_alternative` (left sidebar)

Persistent left sidebar navigation matching the design's layout and categories:
- Kontrolna tabla (Dashboard)
- Analitika uspeha (Analytics)
- Vežbe & Simulacije (Practice & Simulations)
- Materijali (Theory Hub — v2, see 4.9)
- Korisnikov profil (User Profile)

Bottom of sidebar: user avatar, name, logout.

### 4.4 Free Practice

**Reference:** `reference_designs/free_practice`

Users can practice problems from any category — either recommended or self-selected from the dashboard.

- Browse available problems per category with progress indicators
- Solve problems one by one (pick answer, see result)
- Category progress tracker visible (e.g., "14/20, 86%")
- **Every problem solved MUST be recorded** in `problem_progress` — this feeds analytics and ensures exam simulations prioritize unseen problems

### 4.5 Test Simulation — Start Dialog

**Reference:** `reference_designs/test_simulation_start_dialog`

Modal dialog, exactly as designed:

**Step 1 — Test Size:**
| Type | Problems | Description |
|------|----------|-------------|
| Kompletan test | 20 | Simulacija mature |
| Srednji test | 14 | Svakodnevna vežba |
| Brzi test | 8 | Brza provera |

**Step 2 — Mode:**
| Mode | Description |
|------|-------------|
| Vremenski ograničen | Ograničenje: 180 min (scaled proportionally for shorter tests) |
| Bez ograničenja | Vežba bez stresa |

Both timed and untimed modes **record results for analytics**.

### 4.6 Test Simulation — Active Exam

**Reference:** `reference_designs/test_simulation_stress`

Layout matching the stress/proctor design:
- **Right side:** Problem list/navigation with status indicators
- **Left side:** Pacing information (pacing radar showing % of time used vs % of problems completed)
- **Center:** Current problem with math content and answer options
- **Top bar:** Timer countdown, "Završi simulaciju" button
- Previous/Next navigation at bottom

### 4.7 Test Simulation — Scoring

Based on the real ETF exam scoring scheme, scaled proportionally for all test sizes:

**Full test (20 problems) point values:**

| Problems | Points each |
|----------|-------------|
| 1–2 | 3 |
| 3–7 | 4 |
| 8–13 | 5 |
| 14–18 | 6 |
| 19–20 | 7 |

**Total max score (20 problems): 100 points**

**Scoring rules:**
- Correct answer: full points for that position
- Wrong answer: **-16%** of the points for that position (e.g., problem worth 5 points → -0.8 for wrong answer)
- Blank / "N" (no answer): 0 points (no positive, no negative)
- Multiple answers circled OR no answer circled: **-0.5 points**

**For shorter tests (14 or 8 problems):** Scale proportionally. Distribute the same difficulty progression across the available positions. Max score scales linearly.

### 4.8 Test Simulation — Problem Selection Algorithm

Problems are randomly selected with these priorities:
1. **Unseen first:** Prioritize problems the user hasn't seen yet (not in `problem_progress`)
2. **Category coverage:** Ensure all major categories (Algebra, Geometry, Probability, Logic, etc.) are represented
3. **Difficulty distribution:** Match real exam patterns — easier problems at the start, harder toward the end
4. **Randomization:** Within constraints, randomize selection
5. **Fallback:** If the unseen pool is exhausted, allow repeats

### 4.9 Test Simulation — History

**Reference:** `reference_designs/test_simulation_history`

View-only page listing all past test simulations:
- Date and time
- Test type (Kompletan/Srednji/Brzi)
- Duration (actual time / allowed time)
- Score (e.g., 18/20, 90%)
- Status badge (Odlično / Dobro / Potrebna vežba)
- Action: "Pogledaj rešenja" link
- Pagination
- Bottom summary stats: average score %, total practice time, total tests completed
- Filter/search by date, type, status
- Export to PDF option

### 4.10 User Analytics

**Reference:** `reference_designs/user_analytics`

Detailed performance analytics page:
- Prosečna Preciznost (average accuracy %)
- Brzo rešavanje (average solve time)
- Percentilni rang (percentile rank among all users)
- Završene simulacije (completed simulations count)
- Trend uspešnosti (success trend chart over time)
- Uspeh po kategorijama (per-category accuracy breakdown: Algebra, Geometrija, Verovatnoća, Logika)
- Nedavne simulacije (recent simulations list)
- Snage i slabosti (strengths and weaknesses analysis)

**Analytics recalculation:** Triggered synchronously after each test simulation completion or problem solved. No async background jobs for now.

### 4.11 User Profile

Basic info page:
- Display name (editable)
- Email
- Avatar
- Faculty selection (up to 3 + Other, changeable)
- Account settings

### 4.12 Theme Toggle

Light/dark theme toggle icon in the header. Dark theme is default. Both themes must be fully supported in v1.

### 4.13 Theory Hub (v2 — Placeholder in v1)

**Reference:** `reference_designs/theory_corner`

The Theory Hub will follow the `theory_corner` design:
- Content type filters (Sve / Video / PDF / Formule)
- Personalized recommendations ("Preporučeno za tebe")
- Browse by category (Algebra, Geometrija, Verovatnoća, Logika)
- Saved items ("Moj kutak")

**Not shipped in v1.** The nav item should exist but show a "Uskoro" (Coming Soon) placeholder. Theory content will be generated separately and plugged in later.

---

## 5. V1 Excluded Features (Backlog)

The following features from reference designs are **not in v1** and are planned for later releases:

### 5.1 Community Page
**Reference:** `reference_designs/community_page`

Social features: daily challenge with leaderboard, user rankings with ELO, discussion feed, recommended video content. Requires community moderation tools.

### 5.2 Daily Problem
**Reference:** `reference_designs/daily_problem`

"Zadatak dana" — a featured daily problem with discussion, comments section, top contributors sidebar, related challenges. Depends on community features.

### 5.3 Personalised Roadmap
**Reference:** `reference_designs/personalised_roadmap`

Personalized study plan with progress map, readiness projector (predicted scores per faculty), weekly strategy, milestones & badges, AI mentor tips. Requires more user data and ML-based recommendations.

### 5.4 AI Mentor (Contextual)
**Reference:** `reference_designs/problem_ai_mentor`

Per-problem AI chat with hints, step-by-step guidance, 3D visualization, recommended materials. Requires LLM integration (Anthropic/OpenAI/Google providers already ported from BrainSpark).

### 5.5 Theory Dashboard (Curriculum Map)
**Reference:** `reference_designs/theory_dashboard`

Curriculum overview with module progress, detailed module list, theory vault with formulas/key proofs. Extends the Theory Hub with structured curriculum tracking.

### 5.6 Leaderboard
Was in v1.0 spec but deferred from this iteration. Will return in a later release.

### 5.7 AI Tutor (Standalone)
Standalone problem solver (text/screenshot input → HTML solution). Already built but deferred from v1 scope.

---

## 6. Database Schema

### 6.1 Tables

#### `users`
```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id       VARCHAR(255) UNIQUE,
  email           VARCHAR(255) UNIQUE NOT NULL,
  display_name    VARCHAR(50) NOT NULL,
  avatar_url      TEXT,
  password_hash   VARCHAR(255),
  role            VARCHAR(10) NOT NULL DEFAULT 'student',
  target_faculties JSONB DEFAULT '[]',              -- array of up to 3 faculty IDs + "other"
  streak_current  INTEGER NOT NULL DEFAULT 0,
  streak_best     INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

> **Note:** `target_faculty` (single VARCHAR) should be migrated to `target_faculties` (JSONB array) to support up to 3 choices + "other".

#### `faculties`
```sql
CREATE TABLE faculties (
  id              VARCHAR(20) PRIMARY KEY,
  university      VARCHAR(200) NOT NULL,
  name            VARCHAR(200) NOT NULL,
  short_name      VARCHAR(50) NOT NULL,
  exam_duration   INTEGER NOT NULL,           -- minutes
  exam_num_problems INTEGER NOT NULL,
  exam_num_options INTEGER NOT NULL DEFAULT 5,
  scoring_correct NUMERIC(4,2) NOT NULL DEFAULT 1.0,
  scoring_wrong   NUMERIC(4,2) NOT NULL DEFAULT 0.0,
  scoring_blank   NUMERIC(4,2) NOT NULL DEFAULT 0.0,
  exam_date       DATE,                       -- admission exam date for current season
  description     TEXT,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `seasons`
```sql
CREATE TABLE seasons (
  id              VARCHAR(10) PRIMARY KEY,    -- e.g. '2026'
  name            VARCHAR(50) NOT NULL,       -- e.g. 'Sezona 2026'
  exam_period_start DATE NOT NULL,            -- when exam period begins
  is_active       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `topics`
```sql
CREATE TABLE topics (
  id              VARCHAR(50) PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  icon            VARCHAR(10),
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `problems`
```sql
CREATE TABLE problems (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id      VARCHAR(20) NOT NULL REFERENCES faculties(id),
  year            INTEGER NOT NULL,
  problem_number  INTEGER NOT NULL,
  title           VARCHAR(255) NOT NULL,
  html_content    TEXT NOT NULL,
  problem_text    TEXT,
  correct_answer  VARCHAR(10) NOT NULL,
  answer_options  JSONB NOT NULL,
  num_options     INTEGER NOT NULL DEFAULT 5,
  logic_scratchpad TEXT,
  slug            VARCHAR(200) UNIQUE NOT NULL,
  difficulty      NUMERIC(3,1),
  is_published    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `problem_topics`
```sql
CREATE TABLE problem_topics (
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  topic_id   VARCHAR(50) NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (problem_id, topic_id)
);
```

#### `problem_progress`
```sql
CREATE TABLE problem_progress (
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id  UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  status      VARCHAR(20) NOT NULL DEFAULT 'unseen',
  attempts    INTEGER NOT NULL DEFAULT 0,
  last_answer VARCHAR(10),
  is_correct  BOOLEAN,
  context     VARCHAR(20) NOT NULL DEFAULT 'practice',  -- 'practice' or 'exam'
  solved_at   TIMESTAMP WITH TIME ZONE,
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, problem_id)
);
```

#### `mock_exams`
```sql
CREATE TABLE mock_exams (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  faculty_id      VARCHAR(20) NOT NULL REFERENCES faculties(id),
  test_size       VARCHAR(20) NOT NULL DEFAULT 'full',  -- 'full' (20), 'medium' (14), 'quick' (8)
  mode            VARCHAR(20) NOT NULL DEFAULT 'timed', -- 'timed' or 'untimed'
  status          VARCHAR(20) NOT NULL DEFAULT 'in_progress',
  duration_limit  INTEGER,                    -- seconds allowed (null for untimed)
  started_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at     TIMESTAMP WITH TIME ZONE,
  time_spent      INTEGER,
  score           NUMERIC(6,2),
  max_score       NUMERIC(6,2),
  score_percent   NUMERIC(5,2),
  num_correct     INTEGER DEFAULT 0,
  num_wrong       INTEGER DEFAULT 0,
  num_blank       INTEGER DEFAULT 0
);
```

#### `mock_exam_problems`
```sql
CREATE TABLE mock_exam_problems (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id     UUID NOT NULL REFERENCES mock_exams(id) ON DELETE CASCADE,
  problem_id  UUID NOT NULL REFERENCES problems(id),
  position    INTEGER NOT NULL,
  point_value NUMERIC(4,2) NOT NULL,          -- points this problem is worth
  answer      VARCHAR(10),
  is_correct  BOOLEAN,
  is_flagged  BOOLEAN NOT NULL DEFAULT FALSE,
  answered_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(exam_id, position)
);
```

#### `user_analytics` (materialized/cached)
```sql
CREATE TABLE user_analytics (
  user_id             UUID PRIMARY KEY REFERENCES users(id),
  accuracy_percent    NUMERIC(5,2) DEFAULT 0,
  avg_solve_time_sec  INTEGER DEFAULT 0,
  percentile_rank     NUMERIC(5,2) DEFAULT 0,
  total_simulations   INTEGER DEFAULT 0,
  problems_solved     INTEGER DEFAULT 0,
  problems_attempted  INTEGER DEFAULT 0,
  category_breakdown  JSONB DEFAULT '{}',     -- { "algebra": 92, "geometrija": 74, ... }
  strengths           JSONB DEFAULT '[]',     -- top categories
  weaknesses          JSONB DEFAULT '[]',     -- bottom categories
  trend_data          JSONB DEFAULT '[]',     -- time series for chart
  updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Other existing tables
- `bookmarks` — unchanged
- `leaderboard_scores` — keep for future use
- `ai_solutions` — keep for future use
- `ai_daily_usage` — keep for future use

---

## 7. Pages & Routes (V1)

| Route | Page | Auth | Description |
|-------|------|------|-------------|
| `/` | Landing | No | Marketing + login CTA |
| `/prijava` | Login | No | Google + credentials sign-in |
| `/onboarding` | Onboarding | Yes | Display name + faculty selection (first login) |
| `/dashboard` | User Dashboard | Yes | Main logged-in page |
| `/vezbe` | Free Practice | Yes | Practice by category |
| `/vezbe/[problemId]` | Problem View | Yes | Single problem practice |
| `/simulacija` | Test Start Dialog | Yes | Configure and start test |
| `/simulacija/[id]` | Active Test | Yes | Timed/untimed exam in progress |
| `/simulacija/[id]/rezultati` | Test Results | Yes | Score breakdown + solutions |
| `/simulacija/istorija` | Test History | Yes | Past tests list |
| `/analitika` | User Analytics | Yes | Performance analytics |
| `/profil` | Profile | Yes | User info + faculty selection |
| `/materijali` | Theory Hub | Yes | Coming soon placeholder (v2) |

---

## 8. API Routes (V1)

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| * | `/api/auth/[...nextauth]` | NextAuth (Google + Credentials) |

### Problems
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/problems` | List problems (filterable by faculty, year, topic, category) |
| GET | `/api/problems/[id]` | Get problem detail |
| GET | `/api/problems/[id]/html` | Raw HTML content for iframe |

### Practice
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/practice/[problemId]/answer` | Submit answer for a practice problem |
| GET | `/api/practice/categories` | Get categories with user progress |
| GET | `/api/practice/recommended` | Get recommended problems for user |

### Test Simulation
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/simulation` | Create new test simulation |
| GET | `/api/simulation/[id]` | Get simulation state |
| PATCH | `/api/simulation/[id]/answer` | Submit/update answer |
| PATCH | `/api/simulation/[id]/flag` | Toggle flag on a problem |
| POST | `/api/simulation/[id]/submit` | Submit simulation for grading |
| GET | `/api/simulation/[id]/results` | Get graded results |
| GET | `/api/simulation/history` | User's past simulations |

### Analytics
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/analytics` | Get user's analytics |
| POST | `/api/analytics/recalculate` | Trigger analytics recalculation |

### User
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PATCH | `/api/user/profile` | Update profile (name, faculties) |
| GET | `/api/user/dashboard` | Dashboard data (goals, countdown, progress) |

### Season
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/season/current` | Get current season info + countdown |

---

## 9. Design System

### 9.1 Theme

Dark theme (default):
- Based on `user_dashboard_alternative` design
- Dark backgrounds with orange/amber accent colors
- Card-based layouts

Light theme:
- Togglable via header icon
- Same layout structure, inverted color scheme

### 9.2 Design References

| Feature | Reference Design |
|---------|-----------------|
| Landing Page | `reference_designs/landing_page` |
| User Dashboard | `reference_designs/user_dashboard_alternative` |
| Free Practice | `reference_designs/free_practice` |
| Test Start Dialog | `reference_designs/test_simulation_start_dialog` |
| Active Test | `reference_designs/test_simulation_stress` |
| Test History | `reference_designs/test_simulation_history` |
| User Analytics | `reference_designs/user_analytics` |
| Theory Hub (v2) | `reference_designs/theory_corner` |

### 9.3 Component Library

- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons
- Recharts for analytics charts

---

## 10. Content

### 10.1 Problem Database

| Attribute | Value |
|-----------|-------|
| Total problems | 799+ |
| Source | Belgrade university admission math exams |
| Format | Self-contained HTML files |
| Language | Serbian (Latin script) |
| Math rendering | MathJax 3 |
| Faculties | ETF (2003-2025), FON (2014-2025), RGF (2022-2025) |
| Categories | 22 topic categories |

### 10.2 Problem Sourcing

The authoritative source of problems is the **prijemni project** at `/Users/jovan/personal/prijemni`. Sync with `/sync-problems`.

---

## 11. Key Behaviors

### 11.1 Problem Tracking

Every interaction with a problem is recorded:
- Free practice answers → `problem_progress`
- Exam simulation answers → `problem_progress` (with context='exam') + `mock_exam_problems`
- This ensures analytics accuracy and that future exam simulations contain unseen problems

### 11.2 Analytics Recalculation

Analytics are recalculated **synchronously** after:
- A test simulation is completed (submitted or auto-submitted on timer expiry)
- A practice problem is solved

No background jobs or cron-based recalculation for now.

### 11.3 Exam Timer

- Client-side countdown timer
- Server validates on submission that time hasn't exceeded limit + 30s grace period
- Auto-submit when timer reaches 0
- Answers persist immediately on each selection (prevent data loss)

---

## 12. Algorithms

### 12.1 Test Composition Algorithm

Generates a problem set for a test simulation from the problem pool.

**Inputs:**
- `testSize`: 20 (full), 14 (medium), or 8 (quick)
- `userId`: the student taking the test
- All available problems with their topics and difficulty

**Step 1 — Define position point values (scaled from 20-problem scheme):**

For a full 20-problem test, positions map to points as:

```
Position:  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20
Points:    3   3   4   4   4   4   4   5   5   5   5   5   5   6   6   6   6   6   7   7
```

For shorter tests, interpolate positions into the same progression curve:

```
For testSize N:
  for i in 1..N:
    mappedPosition = round((i - 1) * 19 / (N - 1)) + 1   // map to 1..20 range
    pointValue[i] = fullTestPoints[mappedPosition]
```

This ensures short tests still start easy and end hard.

**Step 2 — Define difficulty tiers:**

Map positions to 3 difficulty tiers:
- **Easy** (first ~30% of positions): problems from difficulty 1.0–3.0
- **Medium** (middle ~40% of positions): problems from difficulty 3.1–6.0
- **Hard** (last ~30% of positions): problems from difficulty 6.1–10.0

If `difficulty` is null for a problem, treat it as medium (default 5.0).

**Step 3 — Build candidate pool per tier:**

```
For each difficulty tier:
  1. Get all published problems matching that tier
  2. Split into:
     - UNSEEN: problems not in problem_progress for this user
     - SEEN: problems the user has attempted before
  3. Candidate pool = UNSEEN (shuffled). If insufficient, append SEEN (shuffled).
```

**Step 4 — Ensure category coverage:**

The platform has 4 main category groups: Algebra, Geometrija, Verovatnoća, Logika & Ostalo.

```
targetPerCategory = floor(testSize / numCategories)   // e.g., 20/4 = 5
remainder = testSize % numCategories

For each category (sorted by fewest available problems first):
  quota = targetPerCategory + (1 if remainder > 0, decrement remainder)
  Select `quota` problems from the tier-appropriate candidate pools
  Distribute across easy/medium/hard proportionally
```

If a category doesn't have enough problems, redistribute its shortfall to other categories.

**Step 5 — Assign to positions:**

```
Sort selected problems by difficulty ascending
Assign to positions 1..N in order
Each position gets its pre-calculated pointValue from Step 1
```

**Step 6 — Final shuffle within tiers:**

Within each difficulty tier's positions, lightly shuffle (swap adjacent) so the order isn't perfectly predictable, while maintaining the overall easy→hard gradient.

**Output:** Ordered list of `(position, problemId, pointValue)` tuples → inserted into `mock_exam_problems`.

---

### 12.2 Test Scoring Algorithm

**Inputs:**
- `mock_exam_problems` with each problem's `point_value`, `answer`, and the correct answer

**Per problem:**

```
if answer == correct_answer:
    score += point_value                              // full points
elif answer is NULL or answer == 'N':
    score += 0                                        // blank: no penalty
elif multiple_answers_detected or no_answer_detected:
    score += -0.5                                     // invalid submission
else:
    penalty = point_value * 0.16                      // 16% of the problem's value
    score += -penalty                                 // wrong answer
```

**Aggregation:**

```
max_score = SUM(point_value for all problems)
score_percent = (score / max_score) * 100
// score_percent can be negative if many wrong answers
// clamp to 0 for display: display_percent = max(0, score_percent)
```

**Status badge assignment:**

| Score % | Badge |
|---------|-------|
| ≥ 85% | Odlično |
| ≥ 65% | Dobro |
| < 65% | Potrebna vežba |

---

### 12.3 Pacing Radar (During Active Exam)

Shown on the left side during timed exams. Compares time consumption vs problem completion.

```
time_elapsed = now - started_at
time_total = duration_limit
time_percent = (time_elapsed / time_total) * 100

problems_answered = count of problems with non-null answer
problems_total = testSize
progress_percent = (problems_answered / problems_total) * 100

pacing_score = progress_percent / max(time_percent, 1)
// pacing_score > 1.0 = ahead of schedule
// pacing_score < 1.0 = behind schedule
// pacing_score ≈ 1.0 = on track

display_percent = min(100, round(pacing_score * 100))
```

**Pacing indicator colors:**
- Green (≥ 90%): ahead or on track
- Yellow (70–89%): slightly behind
- Red (< 70%): significantly behind

Also show contextual message:
- "Trošiš XX.X% više vremena od ETF proseka" (if behind)
- "Napredak u skladu sa planom" (if on track)
- "Ispred plana!" (if ahead)

---

### 12.4 Knowledge Estimation Algorithm

Estimates a user's knowledge level per category. Used for dashboard display, recommendations, and analytics.

**Per-category accuracy:**

```
For each category C:
  all_attempts = problem_progress records WHERE problem has topic in C
  if all_attempts is empty:
    knowledge[C] = null  // no data
    continue

  // Weight recent attempts more heavily (exponential decay)
  weighted_correct = 0
  weighted_total = 0

  for each attempt in all_attempts:
    days_ago = (now - attempt.updated_at).days
    weight = 0.95 ^ days_ago                          // half-life ≈ 14 days
    weighted_total += weight
    if attempt.is_correct:
      weighted_correct += weight

  knowledge[C] = (weighted_correct / weighted_total) * 100   // 0–100%
```

**Overall knowledge score:**

```
categories_with_data = categories where knowledge[C] is not null
if categories_with_data is empty:
  overall_knowledge = 0

// Weighted average by category importance (number of exam problems per category)
overall_knowledge = weighted_average(
  knowledge[C] for C in categories_with_data,
  weights = problem_count[C] / total_problems
)
```

---

### 12.5 Readiness Estimation (Passing Probability)

Estimates the user's probability of passing each of their target faculties' exams. Shown on dashboard as "Procena prolaznosti" gauge.

**Input:** User's per-category knowledge scores, exam history

```
// Method 1: Simulation-based estimate
// Average the user's last 5 exam simulation score_percents (if available)
recent_exams = last 5 completed mock_exams ordered by finished_at DESC
if recent_exams.length >= 3:
  exam_based_estimate = average(recent_exams.score_percent)
else:
  exam_based_estimate = null

// Method 2: Category-based estimate
// Weight category knowledge by how frequently each category appears on the real exam
category_estimate = weighted_average(
  knowledge[C],
  weights = category_frequency_on_real_exam[C]
)

// Blend both methods (prefer exam-based when available)
if exam_based_estimate is not null:
  readiness = 0.7 * exam_based_estimate + 0.3 * category_estimate
else:
  readiness = category_estimate

// Apply confidence discount for low sample size
sample_size = total_problems_attempted
confidence = min(1.0, sample_size / 100)    // full confidence at 100+ attempts
readiness = readiness * confidence
```

**Display:** Circular gauge (0–100%) with color:
- Green (≥ 75%): "Visoka verovatnoća prolaska"
- Yellow (50–74%): "Umerena verovatnoća"
- Red (< 50%): "Potrebna dodatna priprema"

---

### 12.6 Practice Recommendation Algorithm

Suggests which problems/categories a user should practice next. Shown on dashboard as "Preporuka za danas".

**Step 1 — Identify weak categories:**

```
weakness_scores = {}
for each category C:
  if knowledge[C] is null:
    weakness_scores[C] = 100                          // never tried = highest priority
  else:
    weakness_scores[C] = 100 - knowledge[C]           // lower knowledge = higher priority
```

**Step 2 — Factor in recency:**

```
for each category C:
  days_since_last_practice = days since most recent problem_progress in C
  recency_boost = min(20, days_since_last_practice * 2) // up to +20 for neglected topics
  weakness_scores[C] += recency_boost
```

**Step 3 — Select recommended category:**

```
recommended_category = category with highest weakness_score
```

**Step 4 — Select problems from recommended category:**

```
candidates = problems in recommended_category
  WHERE problem NOT IN (solved correctly by user)
  ORDER BY difficulty ASC                              // start with easier ones
  LIMIT 5
```

If the user has solved all problems in the category correctly, pick problems they got wrong (for retry).

---

### 12.7 Analytics Recalculation

Triggered synchronously after each test simulation or practice problem. Updates the `user_analytics` table.

```
function recalculateAnalytics(userId):

  // 1. Accuracy
  all_progress = problem_progress WHERE user_id = userId AND status != 'unseen'
  accuracy = count(is_correct = true) / count(all_progress) * 100

  // 2. Average solve time (from timed exams only)
  timed_exams = mock_exams WHERE user_id = userId AND mode = 'timed' AND status = 'completed'
  if timed_exams.length > 0:
    avg_time_per_problem = average(time_spent / num_problems for each exam)
  else:
    avg_time_per_problem = null

  // 3. Percentile rank
  all_users_accuracy = [accuracy for each user who has attempted ≥ 10 problems]
  users_below = count(all_users_accuracy WHERE value < user_accuracy)
  percentile = (users_below / total_users) * 100

  // 4. Category breakdown
  category_breakdown = {}
  for each category C:
    cat_progress = problem_progress JOIN problem_topics WHERE topic = C
    category_breakdown[C] = count(correct) / count(total) * 100

  // 5. Strengths & weaknesses
  sorted_categories = sort category_breakdown by value DESC
  strengths = top 3 categories (≥ 70% accuracy)
  weaknesses = bottom 3 categories (< 70% accuracy or least accurate)

  // 6. Trend data (for chart)
  // Group completed exams by week, calculate rolling average score
  trend = []
  for each week in last 12 weeks:
    exams_this_week = mock_exams completed in this week
    if exams_this_week.length > 0:
      trend.push({ week, avg_score: average(score_percent) })

  // 7. Write to user_analytics
  UPSERT user_analytics SET
    accuracy_percent = accuracy,
    avg_solve_time_sec = avg_time_per_problem,
    percentile_rank = percentile,
    total_simulations = count(timed_exams),
    problems_solved = count(is_correct = true),
    problems_attempted = count(all_progress),
    category_breakdown = category_breakdown,
    strengths = strengths,
    weaknesses = weaknesses,
    trend_data = trend,
    updated_at = now()
```

---

### 12.8 Daily Goal Calculation

The dashboard shows a daily goal tracker (e.g., "15/20, 75%").

```
DAILY_GOAL = 20 problems   // configurable per user in future

problems_today = count(problem_progress WHERE user_id = userId
  AND updated_at >= today_start)

// Includes both practice and exam problems solved today
goal_percent = (problems_today / DAILY_GOAL) * 100
```

---

### 12.9 Problem Difficulty Assignment

All problems have a `difficulty` value. For 20-problem entrance exams following the standard format (problems ordered by difficulty, point values increasing), difficulty is assigned randomly from discrete 0.5-step values based on problem position:

| Problem # | Difficulty range | Possible values |
|-----------|-----------------|-----------------|
| 1–5 | [2.0, 4.0] | 2.0, 2.5, 3.0, 3.5, 4.0 |
| 6–12 | [4.0, 6.0] | 4.0, 4.5, 5.0, 5.5, 6.0 |
| 13–17 | [6.5, 8.5] | 6.5, 7.0, 7.5, 8.0, 8.5 |
| 18–20 | [8.0, 9.5] | 8.0, 8.5, 9.0, 9.5 |

**Rationale:** Entrance exams order problems by difficulty. The typical scoring scheme confirms this — earlier problems are worth fewer points (3–4), later ones more (6–7). The random selection within each range adds variance to reflect that not all problems in a tier are identical.

---

## 13. Deployment

- **Hosting:** Vercel
- **Database:** Neon PostgreSQL
- **Domain:** TBD
- **Auth:** Google OAuth + Credentials (bcryptjs for password hashing)
