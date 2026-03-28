# Data Protection System

Specification for protecting Matoteka's 4000+ math problem solutions from bulk scraping and unauthorized redistribution.

## Current Vulnerabilities

| # | Vulnerability | Impact |
|---|---|---|
| 1 | `/api/problems/[problemId]/html` has zero authentication | Anyone can curl every solution |
| 2 | Problem IDs are 8-digit hashes (e.g. `10307566`) — not sequential but enumerable via `/api/problems` list endpoint | Corpus discoverable by paginating the list API |
| 3 | HTML served as plain `text/html` with no cache headers | Browser/CDN caches persist solutions |
| 4 | iframe uses `sandbox="allow-scripts allow-same-origin"` | Parent JS / extensions can read `contentDocument` |
| 5 | No view tracking or rate limiting on solutions | No visibility into abuse |
| 6 | `/api/simulation/[id]` embeds raw solution HTML in JSON | 8-20 solutions leaked per API call |
| 7 | `/api/problems/[problemId]` exposes `correctAnswer` publicly | Answers enumerable without login |

## Architecture Overview

Six independent, incrementally deployable layers:

```
Layer 1: Authentication Gate          ── stops anonymous scraping
Layer 2: View Tracking + Daily Limits ── controls volume per user
Layer 3: Signed Ephemeral URLs        ── prevents URL sharing/replay
Layer 4: Content Obfuscation          ── blocks DOM reading by parent JS
Layer 5: User Watermarking            ── forensic tracing of leaks
Layer 6: IP Rate Limiting             ── throttles unauthenticated requests

All content (statements + solutions) is behind the auth gate. Free accounts can access problems; daily limits apply to solution views.
```

---

## Layer 1: Authentication Gate

### Goal

Require login to access all problem HTML — both statements and full solutions. Users need a free account to view any content. This eliminates anonymous scraping of the entire corpus.

### Changes

#### `app/api/problems/[problemId]/html/route.ts`

```
Import: import { auth } from "@/lib/auth"

In GET handler, after parsing params:
  1. const session = await auth()
  2. If !session?.user → return 401 HTML page (styled, not JSON)
  3. Extract userId = (session.user as any).id
  4. Proceed to serve content (statement or full solution)
```

Add to `HEADERS` constant:

```typescript
"Cache-Control": "no-store, no-cache, must-revalidate, private",
"X-Content-Type-Options": "nosniff",
```

#### `app/api/problems/[problemId]/route.ts`

Add auth gate — this route currently exposes `correctAnswer` publicly:

```
const session = await auth()
if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
```

#### `app/api/simulation/[id]/route.ts`

Remove the `getProblemHtml()` call at line 51 and stop sending `htmlContent` in the JSON response. The simulation page uses `ProblemStatement` iframes, not raw HTML. Set `htmlContent: undefined` or remove the field.

#### 401 HTML Page

Since the HTML route returns `text/html` for iframe display, the 401 must be a styled HTML page, not JSON:

```html
<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: 'Inter', sans-serif; display: flex; align-items: center;
         justify-content: center; height: 100vh; margin: 0; color: #64748b; }
  .msg { text-align: center; }
  h2 { color: #334155; margin-bottom: 8px; }
</style></head>
<body><div class="msg">
  <h2>Potrebna prijava</h2>
  <p>Prijavi se da bi video resenje.</p>
</div></body></html>
```

---

## Layer 2: View Tracking + Daily Limits

### Goal

Log every solution view and enforce a configurable daily limit on unique solutions viewed per user.

### New Database Tables

Add to `drizzle/schema.ts`:

```typescript
export const solutionViews = pgTable(
  "solution_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 20 }).notNull(),
    viewedAt: timestamp("viewed_at", { withTimezone: true }).defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }), // IPv6 max
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
```

Run `npx drizzle-kit push` after adding.

### New File: `lib/utils/solution-rate-limit.ts`

Follows the exact pattern of `lib/utils/rate-limit.ts`:

```typescript
import { db } from "@/lib/db";
import { solutionDailyUsage, solutionViews } from "@/drizzle/schema";
import { eq, and, sql, gte } from "drizzle-orm";

const SOLUTION_DAILY_LIMIT = parseInt(process.env.SOLUTION_DAILY_LIMIT || "30", 10);

export async function checkSolutionRateLimit(
  userId: string
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const today = new Date().toISOString().split("T")[0];
  const result = await db
    .select({ count: solutionDailyUsage.count })
    .from(solutionDailyUsage)
    .where(and(eq(solutionDailyUsage.userId, userId), eq(solutionDailyUsage.date, today)))
    .limit(1);
  const used = result[0]?.count ?? 0;
  return { allowed: used < SOLUTION_DAILY_LIMIT, used, limit: SOLUTION_DAILY_LIMIT };
}

export async function recordSolutionView(
  userId: string,
  problemId: string,
  ipAddress: string | null,
  userAgent: string | null
): Promise<{ isNewToday: boolean }> {
  const today = new Date().toISOString().split("T")[0];
  const todayStart = new Date(today + "T00:00:00Z");

  // Check if this specific solution was already viewed today
  const existing = await db
    .select({ id: solutionViews.id })
    .from(solutionViews)
    .where(
      and(
        eq(solutionViews.userId, userId),
        eq(solutionViews.problemId, problemId),
        gte(solutionViews.viewedAt, todayStart)
      )
    )
    .limit(1);

  const isNewToday = existing.length === 0;

  // Always log the view (audit trail)
  await db.insert(solutionViews).values({ userId, problemId, ipAddress, userAgent });

  // Only increment daily counter for new unique views
  if (isNewToday) {
    await db
      .insert(solutionDailyUsage)
      .values({ userId, date: today, count: 1 })
      .onConflictDoUpdate({
        target: [solutionDailyUsage.userId, solutionDailyUsage.date],
        set: { count: sql`${solutionDailyUsage.count} + 1` },
      });
  }

  return { isNewToday };
}
```

### Integration in HTML Route

After auth check succeeds for full solutions:

```
1. Check if user.role === "admin" → skip rate limit
2. const { allowed, used, limit } = await checkSolutionRateLimit(userId)
3. If !allowed → return styled HTML: "Dnevni limit pregledanih resenja je dostignut (30/30).
   Vrati se sutra!" (with used/limit counts)
4. Extract IP from request headers (x-forwarded-for or x-real-ip)
5. await recordSolutionView(userId, problemId, ip, userAgent)
6. Proceed to serve HTML
```

### Rate Limit HTML Page

```html
<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: 'Inter', sans-serif; display: flex; align-items: center;
         justify-content: center; height: 100vh; margin: 0; color: #64748b; }
  .msg { text-align: center; max-width: 400px; }
  h2 { color: #334155; margin-bottom: 8px; }
  .count { font-size: 2rem; color: #f97316; font-weight: 700; }
</style></head>
<body><div class="msg">
  <div class="count">${used}/${limit}</div>
  <h2>Dnevni limit dostignut</h2>
  <p>Pregledao si maksimalan broj resenja za danas. Vrati se sutra!</p>
</div></body></html>
```

### Environment Variable

| Variable | Default | Purpose |
|---|---|---|
| `SOLUTION_DAILY_LIMIT` | `30` | Max unique solutions per user per day |

### Design Decisions

- **30/day default**: Comfortable for intensive study sessions. Scraping all 4000+ solutions requires 134+ days per account.
- **Re-views are free**: Viewing the same solution again on the same day does not count against the limit. This prevents frustration from page refreshes.
- **Admin bypass**: Users with `role === "admin"` skip the limit entirely.
- **Audit log is append-only**: `solutionViews` records every view including re-views, for abuse detection and analytics.

---

## Layer 3: Signed Ephemeral URLs

### Goal

Prevent URL sharing, replay attacks, and automated scraping by making each solution URL valid only for a specific user for 60 seconds.

### Flow

```
Before (current):
  Client builds URL → /api/problems/{id}/html?theme=dark
  iframe loads URL directly

After:
  Client POST /api/problems/{id}/html-token → { token: "..." }
  Client builds URL → /api/problems/{id}/html?token=xxx&theme=dark
  Server validates token, extracts userId, serves HTML
```

### Token Format

```
base64url( userId + "|" + timestampHex + "." + hmacSignature )
```

- `timestampHex`: Unix seconds as 8-char hex string
- `hmacSignature`: HMAC-SHA256 of `${userId}|${problemId}|${section}|${timestamp}` using `SOLUTION_SIGNING_SECRET`
- TTL: **60 seconds**

### New File: `lib/utils/solution-token.ts`

```typescript
import crypto from "crypto";

const SECRET = process.env.SOLUTION_SIGNING_SECRET || "dev-secret-change-me";
const TTL_SECONDS = 60;

export function generateSolutionToken(
  userId: string,
  problemId: string,
  section: string
): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  const payload = `${userId}|${problemId}|${section}|${timestamp}`;
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  const raw = `${userId}|${timestamp}.${signature}`;
  return Buffer.from(raw).toString("base64url");
}

export function verifySolutionToken(
  token: string,
  problemId: string,
  section: string
): { valid: boolean; userId: string | null; reason?: string } {
  try {
    const raw = Buffer.from(token, "base64url").toString();
    const [userAndTime, signature] = raw.split(".");
    if (!signature) return { valid: false, userId: null, reason: "malformed" };

    const lastPipe = userAndTime.lastIndexOf("|");
    const userId = userAndTime.substring(0, lastPipe);
    const timestamp = userAndTime.substring(lastPipe + 1);

    // Check TTL
    const tokenTime = parseInt(timestamp, 16);
    const now = Math.floor(Date.now() / 1000);
    if (now - tokenTime > TTL_SECONDS) {
      return { valid: false, userId: null, reason: "expired" };
    }

    // Verify HMAC
    const payload = `${userId}|${problemId}|${section}|${timestamp}`;
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return { valid: false, userId: null, reason: "invalid_signature" };
    }

    return { valid: true, userId };
  } catch {
    return { valid: false, userId: null, reason: "error" };
  }
}
```

### New Route: `app/api/problems/[problemId]/html-token/route.ts`

```typescript
import { auth } from "@/lib/auth";
import { checkSolutionRateLimit } from "@/lib/utils/solution-rate-limit";
import { generateSolutionToken } from "@/lib/utils/solution-token";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { problemId } = await params;
  const body = await req.json();
  const section = body.section || "full";

  // Pre-check rate limit (no point issuing a token if they're over limit)
  if ((session.user as any).role !== "admin") {
    const { allowed } = await checkSolutionRateLimit(userId);
    if (!allowed) {
      return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
    }
  }

  const token = generateSolutionToken(userId, problemId, section);
  return NextResponse.json({ token, expiresIn: 60 });
}
```

### Modified HTML Route

For full solutions, the route now accepts either auth session OR valid token:

```
1. Read token from ?token= query param
2. If token present:
   a. verifySolutionToken(token, problemId, section)
   b. If invalid → return 403 HTML page
   c. Extract userId from verified token
3. If no token:
   a. Fall back to auth() session check
   b. If no session → return 401 HTML page
   c. Extract userId from session
4. Proceed with rate limit check and HTML serving
```

This dual-mode approach allows the route to work with both the new token flow and direct session auth (for backward compatibility during rollout).

### Modified Client: `ProblemStatement.tsx`

For `section="full"` mode:

```typescript
const [src, setSrc] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  if (section !== "full") {
    setSrc(`/api/problems/${problemId}/html?section=statement&theme=${theme}`);
    return;
  }

  // Fetch ephemeral token before loading solution
  fetch(`/api/problems/${problemId}/html-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section: "full" }),
  })
    .then((res) => {
      if (res.status === 429) { setError("limit"); return null; }
      if (res.status === 401) { setError("auth"); return null; }
      return res.json();
    })
    .then((data) => {
      if (data?.token) {
        setSrc(`/api/problems/${problemId}/html?token=${data.token}&theme=${theme}`);
      }
    })
    .catch(() => setError("network"));
}, [problemId, section, theme]);
```

### Environment Variable

| Variable | Default | Purpose |
|---|---|---|
| `SOLUTION_SIGNING_SECRET` | `"dev-secret-change-me"` | HMAC key for token signatures. Must be set in production. |

---

## Layer 4: Content Obfuscation

### Goal

Prevent the parent page (and browser extensions) from reading the iframe's DOM, and add friction to casual copying.

### 4a: Remove `allow-same-origin` from Iframe Sandbox

**Change in `ProblemStatement.tsx`:**

```diff
- sandbox="allow-scripts allow-same-origin"
+ sandbox="allow-scripts"
```

**Impact**: Parent JS can no longer access `iframe.contentDocument`. This breaks:
1. ResizeObserver-based dynamic height
2. Direct theme class syncing

Both are replaced with postMessage (see 4b).

### 4b: postMessage Protocol for Resize + Theme

**Injected into every served HTML** (in the HTML route, as part of `sanitizeForIframe` or a new `injectPostMessage` function):

```javascript
(function() {
  // Report height to parent
  function reportHeight() {
    var body = document.body;
    var style = window.getComputedStyle(body);
    var mt = parseInt(style.marginTop || '0', 10);
    var mb = parseInt(style.marginBottom || '0', 10);
    var height = body.offsetHeight + mt + mb + 1;
    window.parent.postMessage({ type: 'matoteka-resize', height: height }, '*');
  }

  // Observe body size changes
  if (window.ResizeObserver) {
    new ResizeObserver(reportHeight).observe(document.body);
  }

  // Also report after MathJax finishes (delayed)
  setTimeout(reportHeight, 1000);
  setTimeout(reportHeight, 3000);
  setTimeout(reportHeight, 8000);

  // Initial report
  if (document.readyState === 'complete') reportHeight();
  else window.addEventListener('load', reportHeight);

  // Listen for theme changes from parent
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'matoteka-theme') {
      document.documentElement.className = e.data.theme;
    }
  });
})();
```

**Rewritten `ProblemStatement.tsx`:**

```typescript
// Listen for height messages from iframe
useEffect(() => {
  const handler = (e: MessageEvent) => {
    if (e.data?.type === "matoteka-resize" && iframeRef.current) {
      iframeRef.current.style.height = e.data.height + "px";
    }
  };
  window.addEventListener("message", handler);
  return () => window.removeEventListener("message", handler);
}, []);

// Send theme changes to iframe via postMessage
useEffect(() => {
  const observer = new MutationObserver(() => {
    const isLight = document.documentElement.classList.contains("light");
    const newTheme = isLight ? "light" : "dark";
    setTheme(newTheme);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "matoteka-theme", theme: newTheme },
      "*"
    );
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}, []);
```

The `onLoad` handler is removed entirely — height is now managed via postMessage.

### 4c: Anti-Copy CSS

Injected into all served HTML (both statements and solutions):

```css
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Block printing */
@media print {
  body { display: none !important; }
}
```

### 4d: Disable Right-Click

Added to the postMessage injection script:

```javascript
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
```

### 4e: CSP Header Tightening

Update the `Content-Security-Policy` header to prevent the iframe content from being loaded in other frames:

```
frame-ancestors 'self'
```

This replaces the `X-Frame-Options: SAMEORIGIN` header (CSP is the modern equivalent).

### Caveat

These are **speed bumps, not barriers**. A user with DevTools open can:
- Override `user-select: none` via element inspector
- Re-enable right-click via console
- Use Playwright/Puppeteer to automate reading

The value is forcing attackers into browser automation territory, which is dramatically slower and more detectable than HTTP scraping.

---

## Layer 5: User Watermarking

### Goal

Embed invisible, user-specific fingerprints so leaked solutions can be traced back to the source account.

### Fingerprint Generation

```
fingerprint = hmac-sha256(userId + "|" + problemId, WATERMARK_SECRET).slice(0, 16)
```

Produces a 16-hex-character identifier unique to each (user, problem) pair.

### Watermark Injection Methods

Three independent methods, all applied in a new `injectWatermark(html, userId, problemId)` function in the HTML route:

#### Method 1: CSS Custom Property

```css
:root { --wm: "a3f28b1c904de7f2"; }
```

Invisible in rendering, present in CSS. Survives "Save As HTML".

#### Method 2: Zero-Width Unicode Characters

Insert zero-width characters between block elements (`<p>`, `<div>`, `<h1>`-`<h6>`):

```
U+200B (zero-width space)     = 0
U+200C (zero-width non-joiner) = 1
```

The 16-hex fingerprint = 64 bits = 64 zero-width characters inserted at up to 64 inter-element boundaries throughout the document.

Survives copy-paste of text content.

#### Method 3: Invisible Span Elements

Scatter zero-sized spans throughout the document body:

```html
<span style="position:absolute;left:-9999px;font-size:0;line-height:0"
      data-m="a3f2"></span>
```

Split the fingerprint across 4 spans (4 hex chars each), inserted at random-but-deterministic positions (seeded by hash of userId + problemId).

### New File: `lib/utils/watermark.ts`

```typescript
import crypto from "crypto";

const SECRET = process.env.WATERMARK_SECRET || "dev-watermark-secret";

export function generateFingerprint(userId: string, problemId: string): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(`${userId}|${problemId}`)
    .digest("hex")
    .slice(0, 16);
}

export function injectWatermark(html: string, userId: string, problemId: string): string {
  const fp = generateFingerprint(userId, problemId);

  // Method 1: CSS custom property
  html = html.replace(/<\/head>/i, `<style>:root{--wm:"${fp}";}</style>\n</head>`);

  // Method 2: Zero-width characters between paragraphs
  const bits = hexToBits(fp);
  const ZWC = ["\u200B", "\u200C"]; // 0 = ZWSP, 1 = ZWNJ
  let bitIndex = 0;
  html = html.replace(/<\/(p|div|h[1-6]|li|tr)>/gi, (match) => {
    if (bitIndex < bits.length) {
      return match + ZWC[bits[bitIndex++]];
    }
    return match;
  });

  // Method 3: Invisible spans (4 spans, 4 hex chars each)
  const chunks = fp.match(/.{4}/g) || [];
  const spanTemplate = (data: string) =>
    `<span style="position:absolute;left:-9999px;font-size:0;line-height:0;width:0;height:0;overflow:hidden" data-m="${data}"></span>`;

  // Insert before </body>
  const spans = chunks.map(spanTemplate).join("");
  html = html.replace(/<\/body>/i, `${spans}\n</body>`);

  return html;
}

function hexToBits(hex: string): number[] {
  const bits: number[] = [];
  for (const ch of hex) {
    const n = parseInt(ch, 16);
    for (let i = 3; i >= 0; i--) {
      bits.push((n >> i) & 1);
    }
  }
  return bits;
}
```

### Forensic Decoder: `scripts/decode-watermark.ts`

Extracts watermarks from leaked HTML files:

```typescript
// Usage: npx tsx scripts/decode-watermark.ts leaked-file.html
// Outputs: fingerprint hash, then queries solutionViews for matching user

// 1. Extract --wm CSS custom property
// 2. Extract zero-width character sequence → decode to hex
// 3. Extract data-m attributes from invisible spans → concatenate
// 4. Cross-reference: if all 3 agree, high confidence in fingerprint
// 5. Look up fingerprint in DB (needs watermarkHash column in solutionViews, or brute-force over users)
```

### Environment Variable

| Variable | Default | Purpose |
|---|---|---|
| `WATERMARK_SECRET` | `"dev-watermark-secret"` | HMAC key for fingerprint generation |

---

## Layer 6: IP-Based Rate Limiting

### Goal

Provide a secondary burst-detection layer for all requests, complementing the DB-backed daily limit.

### Implementation

In-memory rate limiter in the HTML route (no DB, no external service):

```typescript
const IP_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const IP_MAX_REQUESTS = 100; // per window

const ipBuckets = new Map<string, { count: number; resetAt: number }>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
    return true;
  }

  bucket.count++;
  return bucket.count <= IP_MAX_REQUESTS;
}

// Cleanup stale entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of ipBuckets) {
    if (now > bucket.resetAt) ipBuckets.delete(ip);
  }
}, 5 * 60 * 1000);
```

### Application

- **All requests**: Since all HTML is behind auth, IP rate limiting acts as a secondary burst-detection layer alongside the DB-backed daily limit.
- **Resets on cold start**: This is conservative — a serverless restart gives everyone a fresh quota, which is acceptable since the DB-backed limit is the primary control.

---

## File Change Summary

### New Files

| File | Purpose |
|---|---|
| `lib/utils/solution-rate-limit.ts` | Daily solution view limits + audit logging |
| `lib/utils/solution-token.ts` | HMAC-signed ephemeral URL tokens |
| `lib/utils/watermark.ts` | Fingerprint generation + HTML injection |
| `app/api/problems/[problemId]/html-token/route.ts` | Token issuance endpoint |
| `scripts/decode-watermark.ts` | Forensic watermark extraction tool |

### Modified Files

| File | Changes |
|---|---|
| `drizzle/schema.ts` | Add `solutionViews` and `solutionDailyUsage` tables |
| `app/api/problems/[problemId]/html/route.ts` | Auth gate, rate limiting, token validation, watermark injection, postMessage script injection, cache headers, anti-copy CSS, IP rate limit |
| `app/api/problems/[problemId]/route.ts` | Add auth requirement |
| `app/api/simulation/[id]/route.ts` | Remove `htmlContent` from JSON response |
| `components/problems/ProblemStatement.tsx` | Token fetch flow, postMessage-based resize + theme sync, remove `allow-same-origin` from sandbox |

### New Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `SOLUTION_DAILY_LIMIT` | `30` | Max unique solutions per user per day |
| `SOLUTION_SIGNING_SECRET` | must set in prod | HMAC key for ephemeral URL tokens |
| `WATERMARK_SECRET` | must set in prod | HMAC key for watermark fingerprints |

---

## Implementation Order

| Phase | Layers | Risk | Impact | Status |
|---|---|---|---|---|
| 1 | Auth gate + cache headers | Low | Stops all anonymous scraping | **DONE** |
| 1b | Admin-gate problem list API + /vezbe pages | Low | Prevents catalog enumeration | **DONE** |
| 2 | View tracking + daily limits | Low | Caps authenticated scraping to 30/day | |
| 3 | Signed ephemeral tokens | Medium | Prevents URL sharing/replay | |
| 4 | Content obfuscation (postMessage rewrite) | Medium-high | Blocks DOM reading by parent | |
| 5 | Watermarking | Low | Enables forensic tracing | |
| 6 | IP rate limiting | Low | Throttles burst abuse | |

Each phase is independently deployable. Phase 1 alone eliminates the most critical vulnerability (public access to all solutions).

---

## Verification Checklist

- [x] Unauthenticated `curl /api/problems/{id}/html` returns 401
- [x] Unauthenticated `curl /api/problems/{id}/html?section=statement` returns 401
- [ ] Authenticated user can view 30 unique solutions, 31st shows limit page
- [ ] Re-viewing a solution already seen today does not consume a view
- [ ] Admin user bypasses daily limit
- [ ] Token expires after 60 seconds (wait, reload iframe, see 403)
- [ ] Token for problem A cannot be used for problem B
- [ ] iframe height adjusts correctly via postMessage
- [ ] Theme switching works via postMessage
- [ ] MathJax renders correctly in sandboxed iframe (without `allow-same-origin`)
- [ ] Right-click is disabled in solution iframe
- [ ] Text selection is disabled in solution iframe
- [x] `Cache-Control: no-store` header is present on HTML responses
- [ ] Watermark CSS property, zero-width chars, and invisible spans are present in served HTML
- [ ] Forensic decoder correctly extracts fingerprint from watermarked HTML
- [x] Simulation API response no longer contains `htmlContent`
- [x] `/api/problems/{id}` returns 401 without auth
- [ ] IP rate limit kicks in after 100 requests in 15 minutes from same IP
- [x] `/api/problems` list endpoint restricted to admin only
- [x] `/vezbe` pages restricted to admin only
