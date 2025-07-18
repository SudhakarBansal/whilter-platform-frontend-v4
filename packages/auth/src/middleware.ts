import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PUBLIC_PATHS, ROLE_BASED_ROUTES } from './config/access-control'
import { Role } from './utils/role-utils'

export async function sharedMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublic = PUBLIC_PATHS.some((publicPath) =>
    pathname.startsWith(publicPath)
  )

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token) {
    const userRole = token.role as Role

    for (const protectedRoute in ROLE_BASED_ROUTES) {
      if (pathname.startsWith(protectedRoute)) {
        const allowedRoles = ROLE_BASED_ROUTES[protectedRoute]
        if (!allowedRoles?.includes(userRole)) {
          return NextResponse.redirect(new URL('/', req.url))
        }
      }
    }
  }

  return NextResponse.next()
}
