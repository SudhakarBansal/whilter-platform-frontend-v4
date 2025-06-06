import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - CARD CONTENT ||============================== //

export default function CardContent(theme: Theme) {
  return {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2.5), // Converted 20px to theme.spacing(2.5)
          '&:last-child': {
            paddingBottom: theme.spacing(2.5), // Converted 20px to theme.spacing(2.5)
          },
        },
      },
    },
  };
}