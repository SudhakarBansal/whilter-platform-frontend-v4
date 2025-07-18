import { Role } from '../utils/role-utils'


export const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/create-account',
  '/_next',
  '/api',
  '/favicon.ico',
  '/assets',
]

export const ROLE_BASED_ROUTES: Record<string, Role[]> = {
  '/super-admin': [Role.CHARPAI_SUPER_ADMIN],
  '/creative-editor': [Role.CREATIVE_EDITOR],
  '/creative-contributor': [Role.CREATIVE_CONTRIBUTOR],
  '/creative-reviewer': [Role.CREATIVE_REVIEWER],
  '/content-creator': [Role.CONTENT_CREATOR],
  '/campaign-manager': [Role.CAMPAIGN_MANAGER],
  '/campaign-reviewer': [Role.CAMPAIGN_REVIEWER],
}
