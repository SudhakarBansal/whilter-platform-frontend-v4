import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/unauthorized'];

export async function middleware(request: NextRequest) {
  const { pathname, origin, searchParams } = request.nextUrl;

  // Allow static files & public routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get('__Secure-next-auth.session-token')?.value || 
    request.cookies.get('next-auth.session-token')?.value || 
    searchParams.get('token'); 

  if (!token) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }

  try {
    return NextResponse.next();
  } catch (err) {
    console.error('Invalid token:', err);
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }
}
