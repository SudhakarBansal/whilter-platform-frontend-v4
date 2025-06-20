import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Input(theme: Theme): Record<string, unknown> {
  const bgColor = theme.palette.grey[50];

  return {
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: { size?: string; multiline?: boolean } }) => {
          const { size, multiline } = ownerState;
          return {
            '&.Mui-disabled': {
              '& svg': { color: theme.palette.text.disabled },
            },
            ...(!multiline && {
              height:
                size === 'large'
                  ? '52px'
                  : size === 'medium'
                  ? '40px'
                  : size === 'small'
                  ? '32px'
                  : '40px',
            }),
            fontWeight: theme.typography.fontWeightRegular,
            fontSize:
              size === 'large'
                ? '16px'
                : size === 'medium'
                ? '14px'
                : size === 'small'
                ? '12px'
                : '14px',
            background: theme.palette.background.paper,
          };
        },
        input: ({ ownerState }: { ownerState: { error?: boolean } }) => {
          const { error } = ownerState;
          return {
            color: theme.palette.text.primary,
            '&::placeholder': {
              opacity: 1,
              color: error ? theme.palette.error.main : theme.palette.text.disabled,
            },
          };
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500],
          '&:hover': {
            backgroundColor: theme.palette.grey[500],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500],
          },
          '&:hover $notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
        input: ({ ownerState }: { ownerState: { size?: string } }) => {
          const { size } = ownerState;
          return {
            background: bgColor,
            borderRadius: `${theme?.shape?.borderRadius}px`,
            '&.MuiInputBase-inputSizeSmall': {
              '&.MuiInputBase-inputAdornedStart': {
                paddingLeft: 0,
              },
            },
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #fff inset',
            },
          };
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {},
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: { size?: string } }) => {
          const { size } = ownerState;
          return {
            fontSize:
              size === 'large'
                ? '1rem'
                : size === 'medium'
                ? '0.85rem'
                : '0.75rem',
            color: theme.palette.text.primary,
          };
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
  };
}