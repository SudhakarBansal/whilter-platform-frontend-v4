import { NextRequest, NextResponse } from "next/server";
import { checkServiceAccess } from "./utils/auth/checkAccess";
import { Role } from "./constants/role";
import { getToken } from "next-auth/jwt";
import { isTokenExpired } from "./utils/auth/tokenUtils";

interface DecodedToken {
  name: string;
  role: Role;
  section: string[];
  email: string;
  userId: string;
  accessToken: string;
  organization: string;
}
const publicPaths = [
  "/login",
  "/unauthorized",
  "/register",
  "/favicon.ico",
  "/_next",
];

const isProd = process.env.NODE_ENV === "production";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  if (isPublic) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: isProd
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token",
  });

  console.log("Token in middleware:", token);

  const accessExp = (token as any)?.accessTokenExp;
  const expired = isTokenExpired(accessExp as any);
  const authed = !!token && !expired;

  if (!authed) {
    const base = process.env.NEXT_PUBLIC_MAIN_URL || request.url;
    const loginUrl = new URL("/login", base);

    // Store the original URL (including the current domain) as callbackUrl
    const originalUrl = `${process.env.NEXT_PUBLIC_MEDIA_TOOLS_URL}`;
    console.log("originalUrl", originalUrl);
    loginUrl.searchParams.set("callbackUrl", originalUrl);

    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("__Secure-next-auth.session-token");
    res.cookies.delete("next-auth.csrf-token");
    return res;
  }

  try {
    const typedToken = token as unknown as DecodedToken;

    const role: Role = typedToken.role;
    const sections: string[] = typedToken.section || [];
    const currentSection = process.env.NEXT_PUBLIC_SECTION_KEY!;

    const hasAccess = checkServiceAccess(role, sections, currentSection);

    if (!hasAccess) {
      return NextResponse.redirect(
        new URL("/unauthorized", process.env.NEXT_PUBLIC_MEDIA_TOOLS_URL!),
      );
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token decode or access check error:", err);
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_MAIN_URL!),
    );
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next|static|favicon.ico|robots.txt|images|assets|\\.well-known).*)",
  ],
};
