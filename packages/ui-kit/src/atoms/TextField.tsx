import type { Theme } from '@mui/material/styles';

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: theme.shape.borderRadius,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          },
          '& .MuiInputBase-input': {
            padding: theme.spacing(1.5, 2),
            height: 'auto',
            '&::placeholder': {
              opacity: 0.7,
            },
          },
          // Filled variant override
          '& .MuiFilledInput-root': {
            backgroundColor: '#ffffff',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#ffffff',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
              
            },
            '&::before': {
              borderBottom: 0,
            },
            '&:hover:not(.Mui-disabled)::before': {
              borderBottom: 0,
            },
            '&::after': {
              borderBottom: 0,
            },
          },
          '& .MuiFilledInput-input': {
            color: '#000000',
            '&::placeholder': {
              color: 'rgba(0, 0, 0, 0.6)',
              opacity: 1,
            },
          },
          // Size variants
          '& .MuiInputBase-inputSizeSmall': {
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem',
          },
          '& .MuiInputBase-inputMedium': {
            padding: theme.spacing(1.5, 2),
            fontSize: '1rem',
          },
          '& .MuiInputBase-inputLarge': {
            padding: theme.spacing(2),
            fontSize: '1.125rem',
          }
        }
      },
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
      },
    },
  };
}