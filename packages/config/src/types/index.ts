declare module '@mui/material/styles' {
  interface PaletteOptions {
    blue?: {
      300?: string;
      400?: string;
      450?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
    };
    cyan?: {
      400?: string;
    };
    gray?: {
      400?: string;
      800?: string;
    };
    dark?: {
      main?: string;
    };
    navbar?: {
      default?: string;
      light?: string;
      dark?: string;
    };
    sidebar?: {
      default?: string;
      light?: string;
      dark?: string;
    };
    button?: {
      primary?: string;
      primaryLight?: string;
      primaryDark?: string;
      secondary?: string;
      secondaryLight?: string;
      secondaryDark?: string;
      disabled?: string;
    };
    shadows?: {
      button?: string;
      card?: string;
      modal?: string;
    };
    sidebarToggle?: {
      default?: string;
    }
  }
}