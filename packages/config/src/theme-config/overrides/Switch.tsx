import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - SWITCH ||============================== //

export default function Switch(theme: Theme) {
  return {
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: '24px',
          width: '44px',
          padding: 0,
          borderRadius: '40px',
          margin: '10px',
        },
        switchBase: {
          padding: '2px',
        },
        sizeSmall: {
          height: '20px',
          width: '40px',
          '& .MuiSwitch-switchBase': {
            padding: '2px 4px',
          },
        },
        track: {
          // Uncomment and customize if needed
          // opacity: 0.2,
          // backgroundColor: "#fff",
          '.Mui-checked + &': {
            opacity: 1,
            // backgroundColor: "#fff", // Uncomment and customize if needed
          },
        },
        thumb: {
          backgroundColor: theme.palette.common.white,
        },
      },
    },
  };
}