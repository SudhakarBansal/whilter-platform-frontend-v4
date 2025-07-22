import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getRouteConfig, isPublicRoute } from '../utils/role.utils';
import { checkAccess } from '../utils/access-check';
import { Role } from '../config/roles/role';
import { getRedirectPath } from '../utils/role.utils';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static & internal assets
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

  //  If public route, but user is logged in → redirect based on section/role
 if (isPublicRoute(pathname)) {
  if (token) {
    const section = token.section as string;
    const role = token.role as Role;

    const redirectPath = getRedirectPath(section, role, req.nextUrl.origin);
    return NextResponse.redirect(redirectPath);
  }

  return NextResponse.next();
}

  //  Private route: Require login
  if (!token) {
    const { config } = getRouteConfig(pathname);
    const redirectURL = config?.redirectUnauthenticated || '/login';
    return NextResponse.redirect(new URL(redirectURL, req.url));
  }

  const { config } = getRouteConfig(pathname);
  const userRole = token.role as Role;
  const permissions = (token.permissions || []) as string[];

  if (config && !checkAccess({ userRole, userPermissions: permissions, routeConfig: config })) {
    const redirectURL = config.redirectUnauthorized || '/unauthorized';
    return NextResponse.redirect(new URL(redirectURL, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
