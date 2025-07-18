import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { getRouteAccessMeta, isPublicRoute } from '@whilter/auth/utils/route-access'
import { Role } from '@whilter/auth/config/roles/role'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  // Allow public routes
  if (!token && !isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const routeConfig = getRouteAccessMeta(pathname)
  const userRole = token?.role as Role

  if (routeConfig?.allowedRoles) {
    const isSuperAdmin = userRole === Role.SUPER_ADMIN
    const disableSuperAdmin = routeConfig.disableSuperAdmin ?? false

    // If not super admin or super admin is explicitly disabled
    const isAccessAllowed =
      (isSuperAdmin && !disableSuperAdmin) ||
      routeConfig.allowedRoles.includes(userRole)

    if (!isAccessAllowed) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  return NextResponse.next()
}