import { Theme } from "@mui/material/styles";

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            color: "#FFFFFF",
            borderRadius: "40px",
            background: `linear-gradient(180deg, ${theme.palette.button.primaryLight}, ${theme.palette.button.primaryDark})`,
          },
        },
        {
          props: { variant: "flatPrimary" },
          style: {
            color: "#FFFFFF",
            borderRadius: "12px",
            background: `linear-gradient(180deg, ${theme.palette.button.primaryLight}, ${theme.palette.button.primaryDark})`,
          },
        },
        {
          props: { variant: "flatSecondary" },
          style: {
            color: "#2E51C0",
            borderRadius: "12px",
            background: theme.palette.button.secondary,
          },
        },
        {
          props: { variant: "outlinePrimary" },
          style: {
            color: theme.palette.button.primaryLight,
            borderRadius: "12px",
            border: `1px solid ${theme.palette.button.primaryLight}`,
            background: "transparent",
            "&:hover": {
              background: `${theme.palette.button.primaryLight}10`,
            },
          },
        },
        {
          props: { variant: "outlineSecondary" },
          style: {
            color: theme.palette.button.secondary,
            borderRadius: "12px",
            border: `1px solid ${theme.palette.button.secondary}`,
            background: "transparent",
            "&:hover": {
              background: `${theme.palette.button.secondary}10`,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            color: theme.palette.button.primaryLight,
            "&:hover": {
              background: `${theme.palette.button.primaryLight}10`,
            },
          },
        },
        {
          props: { variant: "disabled" },
          style: {
            color: "#FFFFFF",
            borderRadius: "12px",
            background: theme.palette.button.disabled,
            pointerEvents: "none",
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          "&.Mui-disabled": {
            color: "#FFFFFF",
            background: theme.palette.button.disabled,
          },
        },
      },
    },
  };
}
