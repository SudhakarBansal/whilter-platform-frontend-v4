"use client";
import React, { useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { ReactNode } from "react";
import "../../globals.css";
import { Sidebar } from "../components/Sidebar";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "../components/Sidebar/constants/sidebar.constants";

export default function Layout({ children }: { children: ReactNode }) {
    const theme = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleItemSelect = (item: string) => {
        setSelectedItem(item);
        console.log(`Navigated to: ${item}`);
    };

    return (
        <Box 
            className="flex min-h-screen"
            sx={{
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shortest,
                }),
            }}
        >
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
                selectedItem={selectedItem}
                onItemSelect={handleItemSelect}
                theme={theme}
            />
            <Box 
                className="flex-1 flex flex-col"
                sx={{
                    marginLeft: 0,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.shortest,
                    }),
                }}
            >
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: '3rem',
                        background: `linear-gradient(to bottom, ${theme.palette.blue[700]}, ${theme.palette.blue[900]})`,
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.shortest,
                        }),
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
