# Road to Production

Comprehensive production readiness audit of the Matoteka codebase.

---

## CRITICAL — Fix Before Launch

### ~~1. Cron endpoint has zero authentication~~ DONE
- **File:** `app/api/cron/recalc-leaderboard/route.ts`
- Added `Authorization: Bearer <CRON_SECRET>` header verification
- Set `CRON_SECRET` env var in Vercel before deploying

### ~~2. Problem answers exposed publicly~~ DONE
- **File:** `app/api/practice/[problemId]/route.ts`
- Added `auth()` session check; returns 401 for unauthenticated requests

### ~~3. No error boundaries~~ DONE
- Added `error.tsx` at: `app/`, `app/simulacija/`, `app/znanje/`, `app/vezba/`
- Serbian copy, themed UI, retry + back navigation

### ~~4. No database transactions for multi-step writes~~ DONE
- Switched `lib/db.ts` from `neon-http` to `neon-serverless` (WebSocket driver with Pool)
- Wrapped exam submission and practice answer writes in `db.transaction()`
- `lib/streak.ts` accepts optional `txDb` parameter for transactional use

### ~~5. Missing `onDelete` on 6 foreign keys~~ N/A
- Users are soft-deleted via `isActive` column (already in schema since day one)
- No user delete endpoint or code path exists anywhere
- Leaderboard already filters by `is_active = true`
- Missing `onDelete` is a non-issue since users are never hard-deleted

---

## HIGH — Security

### ~~7. No `middleware.ts` for centralized route protection~~ DONE
- Added `middleware.ts` protecting authenticated pages and API routes at the edge
- Pages redirect to `/prijava`, API routes return 401

### ~~8. CSP uses `'unsafe-inline'` and `'unsafe-eval'`~~ DONE
- Split CSP into explicit script-src, style-src, font-src, connect-src directives
- Removed `'unsafe-inline'` from script-src (kept for style-src which needs it)

### ~~9. Missing security headers~~ DONE
- Added global headers in `next.config.ts`: HSTS, X-Content-Type-Options,
  Referrer-Policy, X-Frame-Options, Permissions-Policy

### ~~10. Open redirect vulnerability in login~~ DONE
- Validate callbackUrl: only allow relative paths starting with `/`, reject `//`

### ~~11. `as any` casts on session.user (10+ instances)~~ DONE
- Created `types/next-auth.d.ts` with proper User/Session/JWT interfaces
- Replaced ~40 `(session.user as any).X` across 38 files

### ~~12. innerHTML without sanitization~~ DONE
- Strip `<script>` tags and `on*` event handler attributes before setting innerHTML

---

## HIGH — Database

### 13. Missing database indexes
- **File:** `drizzle/schema.ts`
- `problem_progress(userId, status)` — heavily filtered in dashboard queries
- `problem_progress(userId, solvedAt)` — time-based queries in dashboard
- `problem_progress(problemId)` — join candidate, no index
- `mockExams(status, finishedAt)` — filtered in leaderboard and analytics
- `users.googleId` — queried on every OAuth login

### 14. No migration history
- **Dir:** `drizzle/migrations/` is empty
- Only `db:push` is used for schema sync
- Cannot rollback schema changes or track schema evolution
- Generate and commit Drizzle migrations; use `db:migrate` instead of `db:push`

### 15. Race condition in rate limiting
- **File:** `lib/utils/rate-limit.ts`
- Check-then-increment pattern without atomicity
- Two concurrent requests can both pass the check before either increments
- Use a single atomic upsert with a RETURNING clause or database-level constraint

### 16. Pagination parameters unbounded
- **Files:** `app/api/leaderboard/route.ts:8`, `app/api/simulation/history/route.ts:14-15`, `app/api/problems/route.ts:24-25`
- No upper bound on `limit` parameter — `?limit=999999` causes expensive queries
- Add `Math.min(limit, 100)` or similar cap

---

## HIGH — Frontend

### 17. No `<Image>` from next/image anywhere
- **Files:** `components/landing/landing-hero.tsx:70,318,339`, `components/layout/authenticated-layout.tsx:66`, `app/prijava/page.tsx:54`, and 13+ more
- 18+ raw `<img>` tags with no automatic optimization, lazy loading, responsive sizes, or WebP conversion

### 18. Missing SEO metadata on key pages
- No `Metadata` export on: `/vezbe`, `/simulacija`, `/znanje`, `/profil`, `/analitika`, `/primer`
- Root layout and `/about`, `/zadaci` have metadata (good), but most authenticated pages don't

### 19. Leaderboard has no UI
- Backend fully built: DB table, recalculation logic, cron job (every 15 min), API endpoints
- No leaderboard page exists — only surfaces as rank display in dashboard
- Either build the page or remove the cron + endpoints to reduce complexity

---

## MEDIUM — Performance

### 20. No response caching on heavy API routes
- `GET /api/user/dashboard` — 7+ parallel DB queries, no cache headers
- `GET /api/analytics` — heavy computation, no cache headers
- `GET /api/practice/categories` — recalculates readiness scores every request
- `GET /api/lessons` — returns all lessons every request
- Add `Cache-Control: s-maxage=10, stale-while-revalidate=30` or similar

### 21. Synchronous filesystem reads on every request
- **File:** `app/api/analytics/route.ts:11,17`
- `fs.readFileSync()` called twice per analytics request
- Should use async `fs.promises.readFile()` or cache in memory

### 22. 1.8MB problems-index.json loaded as singleton
- **File:** `lib/problems.ts:60`
- Parsed synchronously on first request; re-read on every request in dev mode
- In production the singleton is fine, but monitor memory usage

### 23. Zero memoization across 134+ components
- No `useMemo()`, `useCallback()`, or `React.memo()` found anywhere
- Large components like `components/dashboard/dashboard.tsx` (600+ lines) re-render entirely on filter changes
- Not all need it, but heavy list renders and chart components would benefit

### 24. No code splitting for lessons or charts
- 59 lesson components statically imported in `app/znanje/[lessonId]/page.tsx`
- `recharts` loaded as full bundle in `/app/analitika/page.tsx`
- Use `next/dynamic` or `React.lazy()` for heavy components

### 25. No Suspense boundaries
- All pages use manual `loading` state with `useEffect` fetch
- No streaming SSR, no progressive rendering
- Add `<Suspense>` with skeleton fallbacks on key data-fetching sections

### 26. Font loading not optimized
- **File:** `app/layout.tsx:32-41`
- Loads 6 Inter font weights via Google Fonts stylesheet link
- Missing `font-display: swap` to prevent layout shift (FOIT)
- Consider using `next/font` for automatic optimization

---

## MEDIUM — Auth & Sessions

### 27. No session maxAge/updateAge configured
- **File:** `lib/auth.ts`
- JWT session strategy with no explicit lifetime settings
- Tokens valid indefinitely until browser cleared
- Add `session: { maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60 }`

### 28. Cookie security settings not explicit
- **File:** `lib/auth.ts`
- No explicit `Secure`, `HttpOnly`, `SameSite` cookie configuration
- NextAuth v5 defaults are reasonable, but production should be explicit

### 29. next-auth is still beta
- **Version:** `5.0.0-beta.30`
- Beta software in production carries stability and security risks
- Evaluate pinning to stable v4 or accepting the risk with thorough testing

---

## MEDIUM — Code Quality

### 30. Fire-and-forget DB writes silently lose data
- **File:** `lib/utils/solution-rate-limit.ts:52-54`
- Solution view logging uses `.catch(() => {})` — audit records silently lost on failure
- Also: `recalculateAnalytics(userId).catch(() => {})` in multiple routes
- At minimum log errors; ideally await and handle

### 31. console.error for production logging
- **Files:** `app/analitika/page.tsx:160,173`, `app/simulacija/page.tsx:79`, `app/api/analytics/recalculate/route.ts:17`
- Should use structured error tracking (Sentry, LogRocket, etc.) for production

### 32. Duplicated inactivity penalty logic
- Same calculation exists in both `app/api/user/dashboard/route.ts:182-190` and `app/api/analytics/route.ts:76-104`
- Extract to shared utility function

### 33. Input validation inconsistencies
- Zod is installed but not used for API input validation
- String lengths not validated: display name (`app/api/profile/name/route.ts`), answer format
- UUID formats not validated for user/problem IDs
- Consider Zod schemas for all API request bodies

### 34. Inconsistent error response formats
- Some routes return `{ error: "message" }`
- Some return `{ error: "message", used, limit }` (rate limit routes)
- Some return plain text (HTML routes)
- Inconsistent status codes (400 vs 409 for similar validation errors)
- Standardize error response shape

---

## LOW — Nice to Have

### 35. Missing `not-found.tsx` custom 404 page
- Default Next.js 404 shown when navigating to non-existent routes
- Add branded 404 page for better UX

### 36. No build-time type checking in scripts
- **File:** `package.json`
- `build` script is just `next build` — no `tsc --noEmit` or lint step
- Add: `"build": "tsc --noEmit && next build"`

### 37. next.config.ts is minimal (11 lines)
- No compression config
- No security headers config
- No redirects/rewrites
- No bundle analyzer
- No output config

### 38. TypeScript target ES2017
- **File:** `tsconfig.json`
- Should be ES2020+ for modern browser features (optional chaining, nullish coalescing in output)

### 39. Lucide React major version gap
- **Current:** `0.575.0`, **Latest:** `1.7.0`
- Major version jump likely has breaking changes
- Audit icon usage before upgrading

### 40. No robots.txt or sitemap
- If the site is public-facing, add for SEO
- If authenticated-only, add robots.txt to block crawlers

### 41. MathJax loading strategy
- **Files:** `components/problems/AnswerOptions.tsx:47-68`, `app/simulacija/[id]/page.tsx:120-138`
- Script appended to DOM on every component mount
- Deduplication exists (checks `window.MathJax`) but should use `next/script` with `strategy="afterInteractive"`

### 42. .env.local credential management
- Contains hardcoded DATABASE_URL, AUTH_SECRET, GEMINI_API_KEY
- Use Vercel Secrets for production deployment
- Create `.env.example` template for documentation

### 43. No test coverage metrics
- `vitest` configured but unclear test coverage
- Add coverage thresholds for critical paths (auth, exam submission, rate limiting)

---

## What's Already Good

- Drizzle ORM with parameterized queries (no SQL injection)
- Proper bcrypt password hashing
- Admin routes consistently use `requireAdmin()`
- Rate limiting on AI and solution views
- Cascade deletes on bookmarks, progress, solution views
- `Promise.all()` for parallel DB queries in dashboard
- Proper cleanup of timers, event listeners, MutationObservers
- Responsive design with Tailwind
- Dark/light theme support
- TypeScript strict mode enabled
- Content protection on solutions (anti-copy, watermark, iframe sandboxing)
