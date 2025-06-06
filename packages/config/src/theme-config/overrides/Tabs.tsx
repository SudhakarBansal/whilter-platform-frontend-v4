import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs() {
  return {
    MuiTabs: {
      styleOverrides: {
        vertical: {
          overflow: 'visible',
        },
      },
    },
  };
}