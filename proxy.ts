import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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

export default auth((req) => {
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

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo\\.svg|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$|.*\\.webmanifest$|.*\\.css$|.*\\.js$|api/auth).*)",
  ],
};
