import { Theme } from '@mui/material/styles';

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
  };
}