# Security Audit

Date: 2026-04-01
Scope: repository review of the current `tatamata` codebase with emphasis on security, implementation gaps, and production readiness.

## Findings

1. Critical: practice endpoints leak the answer key before submission.

   `app/api/practice/[problemId]/route.ts:21` returns `correctAnswer` to any authenticated user before they answer the problem. `components/problems/ProblemView.tsx:71` fetches that payload on page load. `app/api/problems/[problemId]/route.ts:19` exposes the same field on a second route. Any user can inspect the network response or client state and bypass the product’s core mechanic.

2. High: simulation mutation routes do not verify exam ownership or exam state.

   `app/api/simulation/[id]/answer/route.ts:18` and `app/api/simulation/[id]/flag/route.ts:18` update rows using only `examId` and the row id. They do not verify that the exam belongs to the current user, and they do not block writes after the exam is completed. `app/api/simulation/[id]/route.ts:19` already shows the intended ownership check pattern and should be mirrored in these mutation routes.

3. High: a hard-coded admin bootstrap password is committed to the repository.

   `scripts/seed-admin.ts:11` and `scripts/seed-admin.ts:12` define a fixed admin email and password. Re-running the script resets that account to a known credential. In any shared or misconfigured environment, this creates an avoidable privilege-escalation path.

4. Medium: the analytics API appears broken in the current repository state.

   `app/api/analytics/route.ts:14` and `app/api/analytics/route.ts:23` synchronously read `database/categories.json` and `database/category_groups.json`. Those files are not present in the current `database/` directory, so `/api/analytics` should fail with `ENOENT` on first use unless the runtime environment injects those files externally.

5. Medium: AI endpoints are missing basic abuse controls and HTML isolation.

   `app/api/ai/solve/route.ts:19` accepts uploaded files and base64-encodes the whole payload at `app/api/ai/solve/route.ts:30` without file size or MIME validation. `app/api/ai/ask/route.ts:21` accepts unbounded text input. `lib/llm/prompt.ts:27` explicitly allows the model to emit JavaScript, and `app/api/ai/solutions/[id]/html/route.ts:20` serves that HTML back without CSP, sanitization, or iframe sandbox enforcement at the response layer. That is a weak trust boundary for model-generated content.

6. Medium: credential authentication lacks brute-force protection, and Google account linking is fragile.

   `lib/auth.ts:15` performs unlimited password verification with no throttle, delay, lockout, or per-IP protection. `lib/auth.ts:67` only checks Google users by `googleId` before insert; existing password users with the same email are not deliberately linked and may fail on the unique email constraint instead of following a controlled account-linking path.

7. Medium: production dependencies currently include known advisories.

   `package.json:30` and `package.json:35` match the `npm audit --omit=dev` output from this review. The current tree reports 6 production vulnerabilities in total, including advisories affecting `next@16.1.6` and the `better-react-mathjax` dependency chain.

## Secondary Issues

- `app/api/analytics/recalculate/route.ts:5` allows any authenticated user to trigger an expensive recalculation path, and `lib/analytics.ts:50` includes global percentile work. This should be rate-limited, queued, or moved off the request path.
- `lib/utils/watermark.ts:3` silently falls back to `dev-watermark-secret` instead of failing closed when the production watermark secret is missing.

## Validation Notes

- `npm run build` succeeded, but Turbopack warned about overly broad dynamic file matching at `lib/problems.ts:198`.
- `npm test` failed. Thirteen tests in `app/api/problems/[problemId]/html/route.test.ts:13` are stale because the mock only exports `getProblemHtml`, while the route now also depends on `getProblemMeta`.
- `npm audit --omit=dev --json` reported 5 high and 1 moderate production vulnerabilities.

## Immediate Priorities

1. Remove `correctAnswer` from pre-answer API responses and keep answer validation server-side only.
2. Add ownership and status checks to all simulation mutation routes.
3. Replace the hard-coded admin bootstrap credential flow with environment-provided secrets or a one-time setup path.
4. Harden AI upload validation and isolate model-generated HTML before serving it.
5. Repair the broken analytics data dependency and update failing tests so the release signal is trustworthy.
