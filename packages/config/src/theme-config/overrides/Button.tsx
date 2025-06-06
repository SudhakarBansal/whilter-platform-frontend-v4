import { Theme } from "@mui/material/styles";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        // Root Button Styles
        root: {
          textTransform: "none",
          verticalAlign: "middle",
          borderRadius: "12px",
        },
        primary: {
          color: "#FFFFFF",
          borderRadius: "40px",
          background: `linear-gradient(180deg, ${theme.palette.button.primaryLight}, ${theme.palette.button.primaryDark})`,
        },
        secondary: {
          color: "#2E51C0",
          borderRadius: "40px",
          background: theme.palette.button.secondary,
        },
        flatPrimary: {
          color: "#FFFFFF",
          borderRadius: "12px",
          background: `linear-gradient(180deg, ${theme.palette.button.primaryLight}, ${theme.palette.button.primaryDark})`,
        },
        flatSecondary: {
          color: "#2E51C0",
          borderRadius: "12px",
          background: theme.palette.button.secondary,
        },
        // Outlined Buttons
        outlined: {
          borderRadius: "40px",
          backgroundColor: "transparent",
        },
        outlinedDisabled: {
          borderColor: "#636363",
          color: "#A0A0A0",
        },
      },
    },
  };
}
