import React from 'react';
// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[1],
        },
      },
    },
  };
}