
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  GUEST_GOOGLE = 'GUEST_GOOGLE',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  CAMPAIGN_MANAGER = 'campaign-manager',
  CREATIVE_CONTRIBUTOR = 'creative-contributor',
  CREATIVE_EDITOR="CREATIVE_EDITOR"
}

export const SECTIONS = {
  DASHBOARD: 'DASHBOARD',
  MEDIA_TOOLS: 'MEDIA_TOOLS',
  CHARP_AI: 'CHARP_AI',
  MARKETPLACE: 'MARKETPLACE'
} as const;

export type Section = (typeof SECTIONS)[keyof typeof SECTIONS];
