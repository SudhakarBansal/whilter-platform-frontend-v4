import type { Theme } from "@mui/material/styles";

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
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#2D51C2", // Slightly more opaque on hover
              boxShadow: `
                0px 10px 20px 0px #0000004D,
                0px 1px 0px 0px #FFFFFF66 inset,
                0px -3px 0px 0px #00000033 inset,
                0px 0px 180px 0px #9917FF
              `,
            },
          },
        },
        {
          props: { variant: "flatSecondary" },
          style: {
            color: `${theme.palette.blue[300]}`,
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
            color: theme.palette.button.primaryLight,
            borderRadius: "12px",
            background: theme.palette.button.disabled,
            pointerEvents: "none",
          },
        },
        {
          props: { variant: "glassmorphism" },
          style: {
            color: theme.palette.button.defaultBackground,
            borderRadius: "40px",
            background: "#FFFFFF14", // 8% opacity white background
            border: "1px solid #FFFFFF24", // 14% opacity white border
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "#2D51C2", // Slightly more opaque on hover
              border: "1px solid #FFFFFF30",
              boxShadow: `
                0px 10px 20px 0px #0000004D,
                0px 1px 0px 0px #FFFFFF66 inset,
                0px -3px 0px 0px #00000033 inset,
                0px 0px 180px 0px #9917FF
              `,
            },
          },
        }
        
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          "&.Mui-disabled": {
            color: theme.palette.button.primaryLight,
            background: theme.palette.button.disabled,
          },
        },
      },
    },
  };
}