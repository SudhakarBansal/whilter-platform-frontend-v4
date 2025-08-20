import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const publicRoutes = ['/login', '/register', '/auth/callback' , '/forgot-password'];

    // Skip static and API routes
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/static/') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }
    
    // If user is authenticated and accessing login, redirect to /
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user has token and role, redirect from public routes to platform
    if (token && token.role) {
      if (pathname === '/' || publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/platform', request.url));
      }
    }

    // If no token and accessing protected route, redirect to login
    if (!token && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt|fonts|images).*)'],
};
