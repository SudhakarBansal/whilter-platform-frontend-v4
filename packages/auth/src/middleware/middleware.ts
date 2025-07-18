import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PUBLIC_PATHS, ROLE_BASED_ROUTES } from '../config/access-control.config'
import { Role } from '../config/roles/role'

export async function sharedMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

  if (!token && !isPublic) {
    // Not logged in and not a public path
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token) {
    const userRole = token.role as Role

    // Check if path is role-restricted
    const matchedRoute = Object.entries(ROLE_BASED_ROUTES).find(
      ([routePath]) => pathname.startsWith(routePath)
    )

    if (matchedRoute) {
      const [routePath, allowedRoles] = matchedRoute
      if (!allowedRoles.includes(userRole)) {
        console.warn(`Unauthorized access attempt by ${userRole} to ${routePath}`)
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }

  return NextResponse.next()
}
