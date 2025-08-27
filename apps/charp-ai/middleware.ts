
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { checkServiceAccess } from "./utils/auth/checkAccess";
import { isTokenExpired } from "./utils/auth/tokenUtils";
import { Role } from "./contants/role";

const PUBLIC = new Set([
  "/login",
  "/register",
  "/unauthorized",
  "/auth/callback",
  "/auth/error",
  "/forgot-password",
]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

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

  if (PUBLIC.has(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessExp = (token as any)?.accessTokenExp 
  const expired = isTokenExpired(accessExp as any);
  const authed = !!token && !expired;


  if (!authed) {
    const base = process.env.NEXT_PUBLIC_MAIN_URL || request.url;
    const loginUrl = new URL("/login", base);

    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("__Secure-next-auth.session-token");
    res.cookies.delete("next-auth.csrf-token");
    return res;
  }

  try {
    const role: Role = (token as any).role as Role;
    const sections: string[] = (token as any).section ?? [];
    const currentSection = process.env.NEXT_PUBLIC_SECTION_KEY!;

    const hasAccess = checkServiceAccess(role, sections, currentSection);
    if (!hasAccess) {
      const base = process.env.NEXT_PUBLIC_CHARP_AI_URL || request.url;
      return NextResponse.redirect(new URL("/unauthorized", base));
    }

    return NextResponse.next();
  } catch {
    const base = process.env.NEXT_PUBLIC_MAIN_URL || request.url;
    return NextResponse.redirect(new URL("/login", base));
  }
}

export const config = {
  matcher: ["/((?!api/auth|_next|static|favicon.ico|robots.txt|images|assets|\\.well-known).*)"],
};
