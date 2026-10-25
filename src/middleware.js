import { NextResponse } from "next/server";

/**
 * Next.js Middleware for Route Protection
 * Runs on every request matching /admin/:path* BEFORE any page or layout is rendered.
 * Prevents Flash of Unauthenticated Content (FOUC).
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. If accessing protected admin routes without token -> redirect to /admin/login
  if (pathname.startsWith("/admin/dashboard") || pathname === "/admin") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If already logged in and accessing /admin/login -> redirect to /admin/dashboard
  if (pathname === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (token) {
      const dashboardUrl = new URL("/admin/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
