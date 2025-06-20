import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - HELPER TEXT ||============================== //

export default function HelperText(theme: Theme) {
  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // Add your custom styles for helperText here
          // Example:
          // color: 'red',
          // height: '0',
          // marginTop: '0',
        },
      },
    },
  };
}