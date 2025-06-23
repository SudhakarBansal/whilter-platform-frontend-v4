import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface ThemeOption {
  darkTextPrimary: string;
  menuSelected: string;
  menuSelectedBack: string;
}

export default function Lists(theme: Theme, themeOption: ThemeOption) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: themeOption.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: themeOption.menuSelected,
            backgroundColor: themeOption.menuSelectedBack,
            '&:hover': {
              backgroundColor: themeOption.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: themeOption.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: themeOption.menuSelectedBack,
            color: themeOption.menuSelected,
            '& .MuiListItemIcon-root': {
              color: themeOption.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: themeOption.darkTextPrimary,
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          alignSelf: 'center',
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0,
        },
        primary: {
          color: 'inherit',
        },
      },
    },
  };
}