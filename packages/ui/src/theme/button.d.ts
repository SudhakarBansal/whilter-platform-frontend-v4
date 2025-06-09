import '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    flatPrimary: true;
    flatSecondary: true;
    outlinePrimary: true;
    outlineSecondary: true;
    text: true;
    disabled: true;
    // Disable default variants if you don't need them
    contained: false;
    outlined: false;
  }
}