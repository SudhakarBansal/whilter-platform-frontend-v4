import '@mui/material/styles';
import '@mui/material/Button';

// Button variants declaration
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    flatPrimary: true;
    flatSecondary: true;
    outlinePrimary: true;
    outlineSecondary: true;
    contained: false;
    outlined: false;
    text: true;
    disabled: true;
  }
}

// Theme palette declaration 
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
      defaultBackground: string;
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
      defaultBackground?: string;
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