import { NextRequest, NextResponse } from 'next/server';
import { checkServiceAccess } from './utils/checkAccess';
import { Role } from './constants/role';
import { getToken } from 'next-auth/jwt';

interface DecodedToken {
  role: Role;
  section: string[];
  email: string;
  userId: string;
  accessToken: string;
  organization: string;
}
const publicPaths = ['/login', '/unauthorized', '/register', '/favicon.ico', '/_next'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  if (isPublic) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // secureCookie: process.env.NODE_ENV === 'production',
  });

  if (!token) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }

  try {
    const typedToken = token as unknown as DecodedToken;

    const role: Role = typedToken.role;
    const sections: string[] = typedToken.section || [];
    const currentSection = process.env.NEXT_PUBLIC_SECTION_KEY!;

    const hasAccess = checkServiceAccess(role, sections, currentSection);

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', process.env.NEXT_PUBLIC_CHARP_AI_URL!));
    }

  
    return NextResponse.next();
  } catch (err) {
    console.error('Token decode or access check error:', err);
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_MAIN_URL!));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
