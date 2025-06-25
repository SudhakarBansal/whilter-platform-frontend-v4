import React from 'react';
import type { Theme } from '@mui/material/styles';

// Extend the Theme interface to include the 'colors' property
declare module '@mui/material/styles' {
  interface Theme {
    colors?: {
      primaryDark?: string;
      primary200?: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      primaryDark?: string;
      primary200?: string;
    };
  }
}

export default function Avatar(theme: Theme) {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
  };
}
