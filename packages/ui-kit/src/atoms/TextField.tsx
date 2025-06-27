import { Theme } from '@mui/material/styles';

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
          // Size variants
          '& .MuiInputBase-inputSizeSmall': {
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem',
          },
          '& .MuiInputBase-inputMedium': {
            padding: theme.spacing(1.5,2),
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