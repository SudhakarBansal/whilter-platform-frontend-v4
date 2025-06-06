import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - DIVIDER ||============================== //

export default function Divider(theme: Theme) {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider, // Accessing the divider color from the theme palette
          opacity: 1,
        },
      },
    },
  };
}