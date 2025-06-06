import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    button: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      disabled: string;
    };
    sidebar: {
      default: string;
      light: string;
      dark: string;
    };
    navbar: {
      default: string;
      light: string;
      dark: string;
    };
    blue: {
      300: string;
      400: string;
      450: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    button?: {
      primary?: string;
      primaryLight?: string;
      primaryDark?: string;
      secondary?: string;
      secondaryLight?: string;
      secondaryDark?: string;
      disabled?: string;
    };
    sidebar?: {
      default?: string;
      light?: string;
      dark?: string;
    };
    navbar?: {
      default?: string;
      light?: string;
      dark?: string;
    };
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
  }
}