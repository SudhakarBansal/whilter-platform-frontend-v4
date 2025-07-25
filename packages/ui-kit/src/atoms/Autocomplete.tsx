import type { Theme } from '@mui/material/styles';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shadows[1],
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        clearIndicator: {
          color: theme.palette.text.secondary, // Default color
          '&:hover': {
            color: theme.palette.text.primary, // Hover color
            backgroundColor: theme.palette.action.hover,
          },
          '&:focus': {
            color: theme.palette.text.primary, // Focus color
            backgroundColor: theme.palette.action.focus,
          },
        },
      },
    },
  };
}