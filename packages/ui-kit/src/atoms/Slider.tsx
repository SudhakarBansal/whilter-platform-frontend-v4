import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - SLIDER ||============================== //

export default function Slider(theme: Theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          padding: '10px 0', // reduce vertical space
          '&.Mui-disabled': {
            color: theme.palette.grey[300],
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#FFFFFF',
          },
        },
        track: {
          height: 4, // default is 4, reduce if needed
        },
        rail: {
          height: 4, // match the track
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme.palette.primary.dark,
          fontSize: '0.75rem',
          top: -6, // shift it closer to thumb
        },
      },
    },
  };
}
