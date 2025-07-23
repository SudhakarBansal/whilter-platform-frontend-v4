import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_URL;
    if (!MAIN_APP_URL) {
      throw new Error('NEXT_PUBLIC_MAIN_URL is not defined');
    }

    const publicRoutes = ['/login', '/register', '/forgot-password'];

    // Skip static files and internal routes
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    //  If on a public route
    if (publicRoutes.includes(pathname)) {
      //  Already logged in? Redirect to the root of current app
      if (token) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    //  Not authenticated → redirect to login on MAIN app
    if (!token) {
      return NextResponse.redirect(new URL('/login', MAIN_APP_URL));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    const fallbackUrl = new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000');
    return NextResponse.redirect(fallbackUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt|fonts|images).*)'],
};
