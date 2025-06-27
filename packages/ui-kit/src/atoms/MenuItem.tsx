import { Theme } from '@mui/material/styles';

export default function MenuItem(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1.25, 2),
          fontSize: '0.8rem',
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.action.selected,
            },
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
          },
        },
      },
    },
  };
}