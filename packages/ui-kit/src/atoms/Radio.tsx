import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - RADIO ||============================== //

export default function Radio(theme: Theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: '0 9px',
        },
      },
    },
  };
}