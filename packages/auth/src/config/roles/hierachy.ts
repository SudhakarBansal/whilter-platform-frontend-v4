import { Role } from './role';
import { AppIdentifier } from '../../types/route.type';

export interface RoleHierarchy {
  parent: Role;
  inherits: Role[];
  accessibleApps: AppIdentifier[];
  globalPermissions?: string[];
  appSpecificPermissions?: Partial<Record<AppIdentifier, string[]>>;
}

export const ROLES_HIERARCHY: Record<Role, RoleHierarchy> = {
  [Role.SUPER_ADMIN]: {
    parent: Role.SUPER_ADMIN,
    inherits: [
      Role.CLIENT_ADMIN,
      Role.CAMPAIGN_MANAGER,
      Role.CAMPAIGN_REVIEWER,
      Role.VENDOR_MANAGER,
      Role.PRODUCT_REVIEWER,
      Role.MEDIA_EDITOR,
      Role.MEDIA_VIEWER
    ],
    accessibleApps: ['main', 'charp-ai', 'marketplace', 'media-tools'],
    globalPermissions: ['*']
  },

    [Role.GUEST]: {
    parent: Role.GUEST,
    inherits: [],
    accessibleApps: [],
    globalPermissions: [],
  },

  [Role.CREATIVE_EDITOR]: {
    parent: Role.CREATIVE_EDITOR,
    inherits: [],
    accessibleApps: ['marketplace'],
    appSpecificPermissions: {
      'marketplace': [
        'content:edit',
        'content:moderate'
      ]
    }
  },

  [Role.CREATIVE_CONTRIBUTOR]: {
    parent: Role.CREATIVE_CONTRIBUTOR,
    inherits: [],
    accessibleApps: ['marketplace'],
    appSpecificPermissions: {
      'marketplace': [
        'content:upload',
        'content:view'
      ]
    }
  },


  [Role.CLIENT_ADMIN]: {
    parent: Role.CLIENT_ADMIN,
    inherits: [
      Role.CAMPAIGN_MANAGER,
      Role.VENDOR_MANAGER,
      Role.MEDIA_EDITOR
    ],
    accessibleApps: ['main', 'charp-ai', 'marketplace', 'media-tools'],
    globalPermissions: ['client:manage', 'users:manage']
  },

  [Role.CAMPAIGN_MANAGER]: {
    parent: Role.CAMPAIGN_MANAGER,
    inherits: [Role.CAMPAIGN_REVIEWER],
    accessibleApps: ['charp-ai'],
    appSpecificPermissions: {
      'charp-ai': [
        'campaign:create',
        'campaign:edit',
        'campaign:launch'
      ]
    }
  },

  [Role.CAMPAIGN_REVIEWER]: {
    parent: Role.CAMPAIGN_REVIEWER,
    inherits: [],
    accessibleApps: ['charp-ai'],
    appSpecificPermissions: {
      'charp-ai': [
        'campaign:review',
        'campaign:approve'
      ]
    }
  },

  [Role.VENDOR_MANAGER]: {
    parent: Role.VENDOR_MANAGER,
    inherits: [Role.PRODUCT_REVIEWER],
    accessibleApps: ['marketplace'],
    appSpecificPermissions: {
      'marketplace': [
        'vendor:manage',
        'vendor:approve',
        'products:view'
      ]
    }
  },

  [Role.PRODUCT_REVIEWER]: {
    parent: Role.PRODUCT_REVIEWER,
    inherits: [],
    accessibleApps: ['marketplace'],
    appSpecificPermissions: {
      'marketplace': [
        'products:review',
        'products:approve'
      ]
    }
  },

  [Role.MEDIA_EDITOR]: {
    parent: Role.MEDIA_EDITOR,
    inherits: [Role.MEDIA_VIEWER],
    accessibleApps: ['media-tools'],
    appSpecificPermissions: {
      'media-tools': [
        'media:upload',
        'media:edit',
        'media:delete'
      ]
    }
  },

  [Role.MEDIA_VIEWER]: {
    parent: Role.MEDIA_VIEWER,
    inherits: [],
    accessibleApps: ['media-tools'],
    appSpecificPermissions: {
      'media-tools': [
        'media:view',
        'media:download'
      ]
    }
  }
};