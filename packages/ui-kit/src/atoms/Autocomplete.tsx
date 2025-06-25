import React from 'react';
// ----------------------------------------------------------------------

import type { Theme } from '@mui/material/styles';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.background.default,
          color : theme.palette.text.primary,
        },
      },
    },
  };
}