// filepath: packages/shared-layouts/src/styled/page-layout-presets.ts
import type { PageLayoutConfig } from './page-layout';

// Predefined configuration presets
export const pageLayoutPresets: Record<string, PageLayoutConfig> = {
    // Card-style layout
    card: {
      container: { padding: 2 },
      header: {
        padding: 2,
        borderRadius: 1
      },
      content: {
        padding: 2,
      },
      breadcrumbs: {
        marginBottom: 1,
      }
    },
  
    // Dashboard style
    dashboard: {
      container: { maxWidth: 'xl' },
      heading: { fontSize: '1.875rem', fontWeight: 500 },
      description: { fontSize: '1.125rem' },
      buttons: {
        gap: 2,
        justify: "flex-start"
      },
      content: {
        padding: 0,
        borderRadius: 2
      },
      breadcrumbs: {
        marginBottom: 3,
        fontSize: '0.75rem'
      }
    },
  
    // Minimal style
    minimal: {
      container: { padding: 2 },
      header: { marginBottom: 2 },
      heading: { fontSize: '1.75rem', fontWeight: 600 },
      divider: { show: false },
      animations: { enabled: false },
      breadcrumbs: {
        marginBottom: 1,
        fontSize: '0.8rem'
      }
    },
  
    // Form page style
    form: {
      container: { maxWidth: 'md', padding: 3 },
      content: {
        backgroundColor: '#ffffff',
        padding: 4,
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      },
      breadcrumbs: {
        marginBottom: 2,
      }
    }
  };