"use client";

import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { ProfileSection } from "./components/ProfileSection";
import { ProfileMenu } from "./components/ProfileMenu";
import type { NavbarProps } from "@whilter/shared-types";

export function Navbar({ onMangeUsers, user, onNavigate }: NavbarProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
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
      <Box className="text-white font-semibold text-lg"><img src="https://s3.ap-south-1.amazonaws.com/cdn.whilter.com/website/images/Whilter-logo-coloured-fav.png" height="40" width="40" /></Box>

      <ProfileSection
        isOpen={Boolean(anchorEl)}
        onClick={handleProfileClick}
        theme={theme}
        user={user}
      />
      {/* Profile Menu Dropdown */}
      <ProfileMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        theme={theme}
        onMangeUsers={onMangeUsers}
        user={user}
        onNavigate={onNavigate}
      />
    </Box>
  );
}
