# Readiness Score Algorithm

A single **0–100** score measuring how ready a student is for their math entrance exam. The score reflects **current ability** — past mistakes naturally fall off as the student practices more.

---

## Overview

```
FINAL SCORE = max(0, round(WEIGHTED SUM − INACTIVITY PENALTY))

WEIGHTED SUM =
    Algebra score          × 0.30
  + Trigonometry score     × 0.15
  + Geometry score         × 0.15
  + Analysis score         × 0.15
  + Combinatorics score    × 0.15
  + Exam simulation score  × 0.10
```

Each component is itself a **0–100** score. The inactivity penalty can deduct up to 20 points.

---

## Layer 1 — Subcategory Score (0–100)

Each of the 21 subcategories gets its own score based on the student's **last 10 problem attempts** in that subcategory (sorted by `updatedAt` desc).

```
recent   = last min(10, total_attempts) problems in this subcategory
accuracy = correct_in_recent / len(recent) × 100
confidence = min(1, len(recent) / 3)

subcategory_score = accuracy × confidence
```

**Confidence factor** prevents a single lucky answer from inflating the score. With `MIN_ATTEMPTS = 3`:

| Attempts | Correct | Accuracy | Confidence | Score |
|----------|---------|----------|------------|-------|
| 0        | —       | —        | 0          | **0** |
| 1        | 1/1     | 100%     | 0.33       | **33** |
| 2        | 2/2     | 100%     | 0.67       | **67** |
| 3        | 3/3     | 100%     | 1.00       | **100** |
| 10       | 8/10    | 80%      | 1.00       | **80** |

**Sliding window** — only the last 10 attempts matter. If a student bombed 10 problems last week but then solved 10 new problems correctly, the old mistakes are fully pushed out.

### Duplicate detection

Each problem counts **at most once** in the sliding window. The DB enforces this via a primary key on `(userId, problemId)` — one row per user per problem.

**Rules for re-submissions (same problem, same user):**

1. **Page refresh / re-submit of the same answer** — must be **ignored**. If the user's answer hasn't changed (`lastAnswer` equals the submitted answer), do not increment `attempts` or update `updatedAt`. This prevents a page reload from inflating attempt counts or shifting the problem's position in the sliding window.

2. **Genuine answer change** (user changes their answer to a different option) — this is a legitimate re-attempt. Update `lastAnswer`, `isCorrect`, and `updatedAt`. Increment `attempts`. The problem's window position moves to reflect the new attempt.

3. **Already solved correctly** — if `status = 'solved'`, the status must not downgrade. The `isCorrect` and `lastAnswer` fields should not change. The problem's window position (`updatedAt`) must not move. This prevents a student from accidentally un-solving a problem by revisiting the page.

4. **Simulation/exam context** — problems submitted via mock exam use `onConflictDoNothing()`. If the problem already has a `problem_progress` row (from prior practice or a different exam), the existing row is preserved unchanged.

**Implementation note:** The practice answer endpoint (`/api/practice/[problemId]/answer`) must check `lastAnswer` before updating. If the submitted answer matches the existing `lastAnswer`, return the current state without modifying the row.

---

## Layer 2 — Category Group Score (0–100)

Equal-weight average of all subcategory scores within the group. Untouched subcategories (0 attempts) count as **0** — this incentivizes comprehensive preparation.

```
group_score = sum(subcategory_scores) / number_of_subcategories
```

### Groups and their subcategories

| Group | Weight | Subcategories |
|-------|--------|---------------|
| **Algebra** | 30% | percent_proportion, real_numbers, algebraic_expressions, linear_equations, complex_numbers, polynomials, quadratic_equations, quadratic_function, irrational_equations, exponential_equations, logarithm (11) |
| **Trigonometry** | 15% | trigonometric_expressions, trigonometric_equations (2) |
| **Geometry** | 15% | planimetry, stereometry, analytic_geometry (3) |
| **Analysis** | 15% | function_properties, sequences, derivatives (3) |
| **Combinatorics** | 15% | combinatorics, binomial_formula (2) |

---

## Layer 3 — Exam Simulation Score (0–100)

Average `scorePercent` of the student's **last 5 completed** mock exams, across all faculties.

```
exam_score = average(last 5 completed exams' scorePercent)
```

- Fewer than 5 completed exams → average of whatever exists
- 0 completed exams → score = **0**

---

## Layer 4 — Inactivity Penalty (0–20)

Deducted from the raw score to encourage consistent practice. Activity is defined as solving a problem or completing an exam.

```
days_inactive = days since last activity
penalty = min(20, max(0, (days_inactive − 2) × 2))
```

| Days inactive | Penalty |
|---------------|---------|
| 0–2           | 0       |
| 3             | 2       |
| 5             | 6       |
| 7             | 10      |
| 10            | 16      |
| 12+           | **20** (max) |

Any activity resets `days_inactive` to 0.

---

## Layer 5 — Final Score

```
raw = algebra × 0.30
    + trigonometry × 0.15
    + geometry × 0.15
    + analysis × 0.15
    + combinatorics × 0.15
    + exam_simulation × 0.10

final_score = max(0, round(raw − inactivity_penalty))
```

---

## Layer 6 — Faculty Readiness Thresholds

Each faculty defines a **target score** — the "green light" threshold indicating the student is ready.

| Faculty | Target | Status |
|---------|--------|--------|
| ETF     | 90     | Confirmed |
| RGF     | 75     | Confirmed |
| FON     | —      | TBD |
| MASF    | —      | TBD |
| GRF     | —      | TBD |
| TMF     | —      | TBD |
| MATF    | —      | TBD |
| SF      | —      | TBD |
| FF      | —      | TBD |

### Color bands (relative to faculty threshold T)

| Color      | Condition       | Meaning          |
|------------|-----------------|------------------|
| 🟢 Green   | score ≥ T       | Ready            |
| 🟡 Yellow  | score ≥ T − 15  | Getting close    |
| 🟠 Orange  | score ≥ T − 30  | Making progress  |
| 🔴 Red     | score < T − 30  | Needs work       |

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Brand new user (no activity) | All scores = 0, no penalty (no last activity date) |
| Student practiced only Algebra | Algebra score reflects performance; all other groups = 0 |
| Student took no exams | Exam component = 0 (contributes 0 to the 10% weight) |
| Student inactive 30 days | Max penalty of 20 applied |
| Perfect student, all categories, 5+ exams, active today | Score = 100 |

---

## Data Sources

| Data | Source table | Key fields |
|------|-------------|------------|
| Problem attempts | `problem_progress` | `userId`, `problemId`, `isCorrect`, `updatedAt` |
| Problem → subcategory mapping | `problems-index.json` | `category` field |
| Subcategory → group mapping | `category_groups.json` | `categories` array |
| Exam results | `mock_exams` | `scorePercent`, `status='completed'`, `finishedAt` |
| Last activity date | `users` | `lastActiveDate` |
