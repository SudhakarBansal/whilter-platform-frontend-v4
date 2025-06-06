"use client";

import { Box, CssBaseline, useTheme } from "@mui/material";
import MainSidebar from "../components/main-sidebar";
import MainNavbar from "../components/main-navbar";
import "../../globals.css";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    const theme = useTheme(); // Access the theme
    console.log("theme-common-layout",theme);
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* Sidebar */}
            <MainSidebar />
            <Box
                component="main"
                className="hide-scrollbar"
                sx={{  
                    flexGrow: 2,
                    bgcolor: "transparent", // Set background transparent to apply gradient
                    minHeight: "100vh",
                    background:   `linear-gradient(to bottom, ${theme.palette.blue[400]}, ${theme.palette.blue[800]})`,
                }}
            >
                {/* Navbar */}
                <MainNavbar />
                {/* Page Content */}
                <Box sx={{ p: 2 }}>{children}</Box>
            </Box>
        </Box>
    );
}
