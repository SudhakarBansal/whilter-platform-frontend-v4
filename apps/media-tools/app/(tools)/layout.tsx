import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export default function ToolsListingLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <Box className="relative flex min-h-screen">
            {/* Sidebar Container - Fixed width */}
            <Box className="relative" sx={{
                width: {
                    xs: '24px',  // Initial width on mobile
                    sm: '28px',  // Initial width on tablet
                    md: '32px',  // Initial width on desktop
                }
            }}>
                <Sidebar />
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                className="flex-1"
            >
                {children}
            </Box>
        </Box>
    );
}