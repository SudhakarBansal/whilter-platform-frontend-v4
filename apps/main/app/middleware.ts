// apps/web/app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, ROLE_REDIRECTS } from '@shared/config/routes';
import { getTokenPayload } from '@/lib/auth/utils';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  if (Object.values(ROUTES.PUBLIC).includes(pathname as any)) {
    if (token) {
      const payload = getTokenPayload(token);
      const redirectUrl = ROLE_REDIRECTS[payload.role] || ROUTES.PROTECTED.PLATFORM;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));
  }

  // Role-based routing
  const payload = getTokenPayload(token);
  const basePath = `/${pathname.split('/')[1]}`;

  if (basePath === ROUTES.PROTECTED.PLATFORM) {
    const rolePath = ROLE_REDIRECTS[payload.role];
    if (!pathname.startsWith(rolePath)) {
      return NextResponse.redirect(new URL(rolePath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};