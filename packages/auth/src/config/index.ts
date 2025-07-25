
import { CHARP_AI_ROUTES } from './apps/charp-ai.routes'
import { MARKETPLACE_ROUTES } from './apps/marketplace.routes'
import { MEDIA_TOOLS_ROUTES } from './apps/media-tools.routes'
import { PLATFORM_ROUTES } from './apps/platform.routes'
import { PUBLIC_PATHS } from './public.route'
import { RouteAccessConfig } from '../types/route.type'

export const ALL_ROUTE_CONFIGS: Record<string, RouteAccessConfig> = {
  ...CHARP_AI_ROUTES,
  ...MARKETPLACE_ROUTES,
  ...MEDIA_TOOLS_ROUTES,
  ...PLATFORM_ROUTES,
}

export { PUBLIC_PATHS }









