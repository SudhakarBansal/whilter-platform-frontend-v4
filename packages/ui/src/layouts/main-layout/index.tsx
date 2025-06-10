"use client";
import React, { useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { ReactNode } from "react";
import "../../globals.css";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
    const theme = useTheme(); // Access the theme

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleItemSelect = (item: string) => {
        setSelectedItem(item);
        console.log(`Navigated to: ${item}`);
    };

    const sidebarWidth = sidebarOpen ? 280 : 64;

    return (
        <Box className="flex min-h-screen">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
                selectedItem={selectedItem}
                onItemSelect={handleItemSelect}
                theme={theme}
            />
            <Box className="flex-1 flex flex-col">
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: '3rem', // Account for AppBar height
                        background: `linear-gradient(to bottom, ${theme.palette.blue[700]}, ${theme.palette.blue[900]})`,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
