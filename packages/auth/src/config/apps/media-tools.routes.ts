
import { Role } from '../roles/role'
import { RouteAccessConfig } from '@whilter/auth/types/route.types'

export const MEDIA_TOOLS_ROUTES: Record<string, RouteAccessConfig> = {
 '/media-tools': {
    allowedRoles: [Role.GUEST],
  },
  
}
