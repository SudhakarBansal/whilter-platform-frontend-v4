"use client";
import React from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { ReactNode } from "react";
import "../../globals.css";

export default function Layout({ children }: { children: ReactNode }) {
    const theme = useTheme(); // Access the theme

    console.log("theme",theme);
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 2,
                    maxHeight: "100vh",
                    overflow: "auto",
                    background:theme.palette.background.default
                }}
            >
                <Box sx={{ p: 2 }}>{children}</Box>
            </Box>
        </Box>
    );
}
