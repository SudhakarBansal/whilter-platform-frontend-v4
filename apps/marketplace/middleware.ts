import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  try {
    const { pathname, hostname, port } = request.nextUrl;
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET
    });

    const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_URL;
    if (!MAIN_APP_URL) {
      throw new Error('NEXT_PUBLIC_MAIN_URL is not defined');
    }

    const publicRoutes = ['/login', '/register', '/forgot-password'];
    const currentOrigin = `${hostname}${port ? `:${port}` : ''}`;
    const mainAppOrigin = new URL(MAIN_APP_URL).host;

    if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Redirect to main page if user is logged in and visiting login
    if (publicRoutes.includes(pathname)) {
      if (token) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
 if (!token) {
  return NextResponse.redirect(new URL('/login', request.url));
}

    return NextResponse.next();

  } catch (error) {
    console.error('Middleware error:', error);
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt|fonts|images).*)'],
};