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
  }
}