import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - LINEAR PROGRESS ||============================== //

export default function LinearProgress(theme: Theme) {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: theme.shape.borderRadius, // Use theme's borderRadius for consistency
        },
        bar: {
          borderRadius: theme.shape.borderRadius, // Use theme's borderRadius for consistency
        },
      },
    },
  };
}