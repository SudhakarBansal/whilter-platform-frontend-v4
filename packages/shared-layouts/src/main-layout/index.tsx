"use client";
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";
import "../../globals.css";
import { Sidebar } from "../sidebar";

export function MainLayout({ children }: { children: ReactNode }) {
    const theme = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleItemSelect = (item: string) => {
        setSelectedItem(item);
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
            {/* <Sidebar
                isOpen={sidebarOpen}
                onToggle={handleSidebarToggle}
                selectedItem={selectedItem}
                onItemSelect={handleItemSelect}
                theme={theme}
            /> */}
            <Box 
                className="flex-1 flex flex-col m-0"
                sx={{
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
