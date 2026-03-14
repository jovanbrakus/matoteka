import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/", "/prijava", "/api/auth"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isPublic) return NextResponse.next();

  if (!req.auth) {
    const loginUrl = new URL("/prijava", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const role = (req.auth.user as any)?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/vezbe", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
