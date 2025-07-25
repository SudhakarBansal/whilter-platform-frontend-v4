import type { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(8),
          '&:active': {
            boxShadow: 'none',
          },
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
          '& .MuiSvgIcon-fontSizeSmall': {
            fontSize: '1rem',
          },
        },
        sizeLarge: {
          fontSize: '1rem',
          height: 40,
        },
        light: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          borderColor: theme.palette.primary.light,
          '&.MuiChip-lightError': {
            color: theme.palette.error.main,
            backgroundColor: theme.palette.error.light,
            borderColor: theme.palette.error.light,
          },
          '&.MuiChip-lightSuccess': {
            color: theme.palette.success.main,
            backgroundColor: theme.palette.success.light,
            borderColor: theme.palette.success.light,
          },
          '&.MuiChip-lightWarning': {
            color: theme.palette.warning.main,
            backgroundColor: theme.palette.warning.light,
            borderColor: theme.palette.warning.light,
          },
        },
      },
    },
  };
}