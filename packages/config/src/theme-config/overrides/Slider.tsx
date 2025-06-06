import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - SLIDER ||============================== //

export default function Slider(theme: Theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.grey[300], // Use MUI's built-in grey palette
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper, // Using theme's paper background
          width: '4px',
        },
        valueLabel: {
          color: theme.palette.primary.light, // Use the primary light color from palette
        },
      },
    },
  };
}