"use client"; // Required for Next.js App Router (MUI needs client-side rendering)
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function MainNavbar() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.navbar.default, // Using theme color
        width: "calc(100% - 80px)", // Adjust width for sidebar
        height:"60px",
        left: 80, // Push to the right of the sidebar
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          Dashboard
        </Typography>
        <IconButton>
          <Add sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
