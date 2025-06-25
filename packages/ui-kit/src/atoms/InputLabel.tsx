import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme: Theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.grey[500],
          color: theme.palette.text.primary,
          position: 'relative',
          fontSize: '0.875rem', // Ensure `label` exists in typography
          // transform: 'unset',
          '&.MuiFormLabel-root': {
            overflow: 'inherit',
          },
        },
        outlined: {
          lineHeight: '0.8em',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1em',
          },
          '&.MuiInputLabel-shrink': {
            // background: theme.palette.background.paper,
            padding: '8px 0px',
            // marginLeft: -6,
            lineHeight: '1.4375em',
          },
        },
      },
    },
  };
}