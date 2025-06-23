import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - LINK ||============================== //

export default function Link() {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'none', // Default underline behavior
      },
    },
  };
}