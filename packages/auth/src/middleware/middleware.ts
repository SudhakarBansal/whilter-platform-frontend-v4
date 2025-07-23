import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getRouteConfig, isPublicRoute } from '../utils/role.utils';
import { checkAccess } from '../utils/access-check';
import { Role } from '../config/roles/role';
import { getRedirectPath } from '../utils/role.utils';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (isPublicRoute(pathname)) {
    if (token) {
      const section = token.section as string;
      const role = token.role as Role;
      
      // Redirect to the appropriate dashboard based on user's section
      const redirectPath = getRedirectPath(section, role, req.nextUrl.origin);
      return NextResponse.redirect(redirectPath);
    }
    return NextResponse.next();
  }

  if (!token) {
    const { config } = getRouteConfig(pathname);
    const redirectURL = config?.redirectUnauthenticated || '/login';
    return NextResponse.redirect(new URL(redirectURL, req.url));
  }

  // Get user's role and permissions from token
  const userRole = token.role as Role;
  const userSection = token.section as string;
  const permissions = (token.permissions || []) as string[];

  // First check if user is trying to access their section's routes
  if (!pathname.startsWith(`/${userSection.toLowerCase()}`)) {
    // If not, redirect to their section's dashboard
    const redirectPath = getRedirectPath(userSection, userRole, req.nextUrl.origin);
    return NextResponse.redirect(redirectPath);
  }

  // Then check route-specific permissions
  const { config } = getRouteConfig(pathname);
  if (config && !checkAccess({ userRole, userPermissions: permissions, routeConfig: config })) {
    const redirectURL = config.redirectUnauthorized || '/unauthorized';
    return NextResponse.redirect(new URL(redirectURL, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};