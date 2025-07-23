import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:3000';
  const publicRoutes = ['/login', '/register', '/forgot-password'];

  // Skip static & internal routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Public routes
  if (publicRoutes.includes(pathname)) {
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If not authenticated → redirect to main login
  if (!token) {
    return NextResponse.redirect(new URL('/login', MAIN_APP_URL));
  }

  // Authenticated → allow access
  return NextResponse.next();
}
