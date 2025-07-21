

export interface SectionConfig {
  path: string
  domain?: string
}

export const SECTION_CONFIG: Record<string, SectionConfig> = {
  'charp-ai': {
    path: '/charp-ai',
    domain: process.env.NEXT_PUBLIC_CHARP_AI_URL,
  },
  'marketplace': {
    path: '/marketplace',
    domain: process.env.NEXT_PUBLIC_MARKETPLACE_URL,
  },
  'media-tools': {
    path: '/media-tools',
    domain: process.env.NEXT_PUBLIC_MEDIA_TOOLS_URL,
  },
  'platform': {
    path: '/platform',
    domain: process.env.NEXT_PUBLIC_MAIN_URL,
  },
}
