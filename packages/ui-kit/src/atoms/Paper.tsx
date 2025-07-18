import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${theme.shape.borderRadius}px`, // Use theme's borderRadius for consistency
        },
      },
    },
  };
}