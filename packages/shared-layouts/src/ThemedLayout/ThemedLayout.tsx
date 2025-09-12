"use client";

import { Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";

export default function ThemedLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Box
      className="flex-1 flex flex-col m-0"
      sx={{
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest,
        }),
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: "1rem",
          background: `linear-gradient(to bottom, ${theme.palette.blue[700]}, ${theme.palette.blue[900]})`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
