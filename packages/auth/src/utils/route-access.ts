
import { ROUTE_ACCESS_CONFIG, PUBLIC_PATHS } from '../config'
import { Role } from '../config/roles/role'

export const getRouteAccessMeta = (pathname: string) => {
  return Object.entries(ROUTE_ACCESS_CONFIG).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] ?? null
}

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export const canAccess = (role: Role, pathname: string): boolean => {
  const config = getRouteAccessMeta(pathname)
  if (!config) return false
  if (config.public) return true
  return config.allowedRoles?.includes(role) ?? false
}
