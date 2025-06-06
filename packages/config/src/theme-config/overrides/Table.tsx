import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme: Theme) {
  return {
    MuiTableHead: {
      styleOverrides: {
        root: {
          // backgroundColor: theme.palette.grey[200],
          textTransform: 'uppercase',
          verticalAlign: 'middle',
          borderRadius: 0,
          borderColor: theme.palette.grey[300],
        },
        sizeSmall: {
          padding: '6px 16px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          // paddingTop: 4,
          // paddingBottom: 4,
          // paddingLeft: 6,
          // paddingRight: 6,
          borderColor: theme.palette.divider,
          verticalAlign: 'middle',
          borderRadius: 0,
          padding: '8px 16px',
          lineHeight: '1rem !important',
          // height: 10,
        },
        head: {
          fontWeight: 500,
          // paddingTop: 4,
          // paddingBottom: 4,
          // paddingLeft: 6,
          // paddingRight: 6,
          fontSize: '0.875rem',
          borderRadius: 0,
          backgroundColor: '#F2F2F2',
          padding: '16px',
          lineHeight: '0.2rem',
          textTransform: 'uppercase',
          border: '1px solid #E9E9E9',
          // height: 10,
        },
        sizeSmall: {
          padding: '6px 16px',
        },
      },
    },
  };
}