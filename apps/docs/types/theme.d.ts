import '@mui/material/styles';
import '@mui/material/Button';

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

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      button: {
        primaryLight: string;
        primaryDark: string;
        secondary: string;
      };
    }
  }
}