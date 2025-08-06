import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { menuItems } from "@/utils/data/menuItems.data";

export default function ToolsListingLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box className="relative flex min-h-screen">
      <Sidebar menuItems={menuItems} />
      <Box component="main" className="flex-1">
        {children}
      </Box>
    </Box>
  );
}
