import { NextResponse } from "next/server";

/**
 * Next.js Middleware for Route Protection
 * Runs on every request matching /admin/:path* BEFORE any page or layout is rendered.
 * Prevents Flash of Unauthenticated Content (FOUC).
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes (do not block /admin/login)
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
