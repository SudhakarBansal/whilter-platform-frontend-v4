// app/page.tsx
'use client'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions, ROLE_ROUTE_CONFIG, Role } from '@whilter/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session?.user.role) {
    // Not authenticated or role missing
    redirect('/login')
  }

  const role = session.user.role as Role

  const matchedRoute = Object.entries(ROLE_ROUTE_CONFIG).find(([_, config]) =>
    config.allowedRoles.includes(role)
  )

  if (matchedRoute) {
    redirect(matchedRoute[1].redirectAfterLogin)
  }

  // No match found for role
  return <div>Unauthorized: No route configured for your role.</div>
}
