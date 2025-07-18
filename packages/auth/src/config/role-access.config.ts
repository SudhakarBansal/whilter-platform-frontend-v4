import { Role } from './roles/role'

type RoleConfig = {
  allowedRoles: Role[]
  redirectAfterLogin: string
}

export const ROLE_ROUTE_CONFIG: Record<string, RoleConfig> = {
  '/platform': {
    allowedRoles: [Role.SUPER_ADMIN, Role.ADMIN],
    redirectAfterLogin: '/platform',
  },
  '/marketplace': {
    allowedRoles: [
      Role.CREATIVE_EDITOR,
      Role.CREATIVE_CONTRIBUTOR,
      Role.CREATIVE_REVIEWER,
      Role.CONTENT_CREATOR,
    ],
    redirectAfterLogin: '/marketplace',
  },
  '/charp-ai': {
    allowedRoles: [Role.CAMPAIGN_MANAGER, Role.CAMPAIGN_REVIEWER],
    redirectAfterLogin: '/charp-ai',
  },
   '/media-tools': {
    allowedRoles: [Role.GUEST],
    redirectAfterLogin: '/media-tools',
  },
}
