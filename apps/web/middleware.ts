import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:3001";

const dashboardMatcher = ["/dashboard"];
const authPagesMatcher = ["/signin", "/signup", "/"]; // pages not accessible if logged in

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const cookie = req.headers.get("cookie") || "";

  // Only run auth check for specific pages
  const shouldCheckAuth = [...dashboardMatcher, ...authPagesMatcher].some((path) =>
    pathname.startsWith(path)
  );

  if (!shouldCheckAuth) return NextResponse.next();

  // Call backend /me to check authentication
  let auth = false;
  try {
    const res = await fetch(`${BACKEND_URL}/me`, {
      method: "GET",
      headers: { cookie },
    });
    auth = res.ok;
  } catch {
    auth = false;
  }

  // 1️⃣ Protect dashboard pages
  if (dashboardMatcher.some((path) => pathname.startsWith(path))) {
    if (!auth) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ Redirect authenticated users from auth pages
  if (authPagesMatcher.includes(pathname) && auth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Match only the relevant pages
export const config = {
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/"],
};
