import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  PUBLIC_ROUTES,
  ROLE_REDIRECTS,
  validateRouteAccess,
  type UserRole,
} from '@whilter/config';
import { verifyToken } from '@/lib/auth';

function isPublicPath(pathname: string): boolean {
  return Object.values(PUBLIC_ROUTES).some(route =>
    typeof route === 'string' && (pathname === route || pathname.startsWith(`${route}/`))
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  if (isPublicPath(pathname)) {
    if (!token) return NextResponse.next();

    try {
      const payload = await verifyToken(token);
      const redirectTo = PUBLIC_ROUTES.HOME[payload.role];
      return NextResponse.redirect(new URL(redirectTo, request.url));
    } catch {
      const response = NextResponse.next();
      response.cookies.delete('auth-token');
      return response;
    }
  }

  if (!token) {
    const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = await verifyToken(token);
    const role = payload.role as UserRole;
    const hasAccess = validateRouteAccess(role, pathname);

    if (!hasAccess) {
      const fallback = PUBLIC_ROUTES.HOME[role];
      return NextResponse.redirect(new URL(fallback, request.url));
    }

    const headers = new Headers(request.headers);
    headers.set('x-user-role', role);
    return NextResponse.next({ request: { headers } });

  } catch {
    const response = NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
