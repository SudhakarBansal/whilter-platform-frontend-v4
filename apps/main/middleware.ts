
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isTokenExpired } from "./utils/tokenUtils";

const PUBLIC = ["/login", "/register", "/auth/callback", "/auth/error", "/forgot-password"];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;


  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/.well-known/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname.startsWith("/api/auth/") 
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const expired = isTokenExpired(token?.accessTokenExp as any);
  const authed = !!token && !expired;


  if (authed && (PUBLIC.includes(pathname) || pathname === "/")) {
    return NextResponse.redirect(new URL("/platform", req.url));
  }

  if (!authed && !PUBLIC.includes(pathname)) {
    const loginUrl = new URL("/login", req.url);

    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("__Secure-next-auth.session-token");
    res.cookies.delete("next-auth.csrf-token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next|static|favicon.ico|robots.txt|images|assets|\\.well-known).*)"],
};
