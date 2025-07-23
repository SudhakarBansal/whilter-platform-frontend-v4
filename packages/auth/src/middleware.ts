import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function crossAppAuthMiddleware(request: NextRequest) {
  const { pathname, hostname, port } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Configuration
  const MAIN_APP_URL = process.env.MAIN_APP_URL || 'http://localhost:3000';
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const currentAppUrl = `${hostname}${port ? `:${port}` : ''}`;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    if (token && pathname.startsWith('/login')) {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // Redirect to main app login if no token (for sub-apps)
  if (!token && currentAppUrl !== new URL(MAIN_APP_URL).host) {
    const loginUrl = new URL(`${MAIN_APP_URL}/login`);
    loginUrl.searchParams.set('returnUrl', request.nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  // Handle main app's protected routes
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnUrl', request.nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt|fonts|images).*)'],
};