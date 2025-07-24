import { Role } from "./role";

export type AccessMatrixType = Record<
  string,
  {
    roles: Role[];
    sections?: string[];
  }
>;

export const accessMatrix: AccessMatrixType = {
    
  'Media-tools': {
    roles: [Role.CLIENT_ADMIN],
    sections: ['media-tools', 'marketplace', 'charp-ai'],
  },
  'Dashboard': {
    roles: [ Role.SUPER_ADMIN,Role.CLIENT_ADMIN, Role.CAMPAIGN_MANAGER],
    sections: ['Dashboard'],
  },
  'Marketplace': {
    roles: [Role.CLIENT_ADMIN, Role.CREATIVE_CONTRIBUTOR],
    sections: ['marketplace'],
  },
};
