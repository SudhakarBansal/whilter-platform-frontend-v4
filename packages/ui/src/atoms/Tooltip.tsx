import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.common.white, // Updated to use `theme.palette.common.white` for better compatibility
          backgroundColor: theme.palette.grey[800],
        },
        arrow: {
          color: theme.palette.grey[800],
        },
      },
    },
  };
}