import { Role } from './roles/role'

export const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/sign-up',
]

export const ROLE_BASED_ROUTES: Record<string, Role[]> = {
  '/media-tools':[Role.GUEST],
  '/super-admin': [Role.SUPER_ADMIN],
  '/marketplace/library/edit': [Role.CREATIVE_EDITOR],
  '/marketplace/library/upload': [Role.CREATIVE_CONTRIBUTOR],
  '/marketplace/library/get': [Role.CREATIVE_REVIEWER],
  '/marketplace/library': [Role.CONTENT_CREATOR],
  '/charp-ai/campaigns': [Role.CAMPAIGN_MANAGER],
  '/charp-ai/campaigns/get': [Role.CAMPAIGN_REVIEWER],
}
