
import { Role } from '../roles/role'
import { RouteAccessConfig } from '@whilter/auth/types/route.types'

export const CHARP_AI_ROUTES: Record<string, RouteAccessConfig> = {
  '/charp-ai/campaigns': {
    allowedRoles: [Role.CAMPAIGN_MANAGER],
  },
  '/charp-ai/campaigns/get': {
    allowedRoles: [Role.CAMPAIGN_REVIEWER],
  },
}
