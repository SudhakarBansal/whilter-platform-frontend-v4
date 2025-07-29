"use client";

import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ProfileSection } from "./components/ProfileSection";
import { ProfileMenu } from "./components/ProfileMenu";
import type { User } from "@whilter/shared-types";

interface Props {
  children: React.ReactNode;
  onSettings?: (path: string) => void;
  user?: User;
}

export function NavbarLayout({ children, onSettings, user }: Props) {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Box
        className="w-full h-16 flex items-center justify-between px-6"
        sx={{
          background: `linear-gradient(to right, ${theme.palette.blue[700]}, ${theme.palette.blue[900]})`,
          transition: theme.transitions.create("background", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          boxShadow: theme.shadows[4],
          zIndex: 10,
        }}
      >
        {/* Left: Logo or Title */}
        <Box className="text-white font-semibold text-lg">Whilter</Box>

        {/* Right: Profile Section */}
        <ProfileSection
          isOpen={Boolean(anchorEl)}
          onClick={handleProfileClick}
          theme={theme}
          user={user}
        />
      </Box>

      {/* Profile Menu Dropdown */}
      <ProfileMenu anchorEl={anchorEl} onClose={handleMenuClose} theme={theme} onSettings={onSettings} user={user}/>

      {/* Main content */}
      <Box className="flex-1">
        {children}
      </Box>
    </Box>
  );
}
