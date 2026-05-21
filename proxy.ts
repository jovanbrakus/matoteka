import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";

const publicPaths = [
  "/",
  "/prijava",
  "/about",
  "/terms",
  "/privacy",
  "/primer",
  "/znanje",
  "/sitemap.xml",
  "/robots.txt",
  "/api/auth",
  "/api/lessons",
  "/api/faculties",
  "/api/leaderboard",
  "/api/cron",
  "/monitoring",
];

const onboardingExemptApi = ["/api/onboarding", "/api/auth"];

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isPublic) return NextResponse.next();

  if (!req.auth) {
    // API routes get 401, pages redirect to login
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/prijava", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // First-run onboarding: authed users without onboardedAt go to /onboarding.
  // The `mt-onboarded` cookie is set by /api/onboarding (60s after submit) and
  // by /onboarding/page.tsx (when DB says onboarded but JWT lags) so the proxy
  // can skip the DB lookup on the hot path.
  let onboardedAt: unknown = req.auth.user?.onboardedAt;
  const justOnboarded = req.cookies.get("mt-onboarded")?.value === "1";

  // Fallback: if the JWT says null and we have no hint cookie, the JWT might
  // simply be stale (e.g. user completed onboarding in a previous session and
  // the cookie didn't get re-issued). Trust the DB before forcing a redirect.
  if (!onboardedAt && !justOnboarded && req.auth.user?.id) {
    try {
      const rows = await db
        .select({ onboardedAt: users.onboardedAt })
        .from(users)
        .where(eq(users.id, req.auth.user.id as string))
        .limit(1);
      onboardedAt = rows[0]?.onboardedAt ?? null;
    } catch {
      // If the DB is unreachable, fall back to the JWT value (still null).
    }
  }

  if (
    !onboardedAt &&
    !justOnboarded &&
    pathname !== "/onboarding" &&
    !pathname.startsWith("/onboarding/") &&
    !onboardingExemptApi.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }
    const url = new URL("/onboarding", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo\\.svg|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$|.*\\.webmanifest$|.*\\.css$|.*\\.js$|api/auth).*)",
  ],
};
