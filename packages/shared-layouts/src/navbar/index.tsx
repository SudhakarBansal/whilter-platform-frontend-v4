"use client";
import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ProfileSection } from "./components/ProfileSection";
import { ProfileMenu } from "./components/ProfileMenu";
import type { NavbarProps } from "@whilter/shared-types";

export function Navbar({
  onMangeUsers,
  user,
  onNavigate,
  children,
}: NavbarProps & { children?: React.ReactNode }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        width: "100%",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        background: theme.palette.blue[700],
        boxShadow: 2,
        zIndex: 10,
        borderBottom: 2,
        borderColor: theme.palette.blue[800],
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/cdn.whilter.com/website/images/Whilter-logo-coloured-fav.png"
          alt="Whilter Logo"
          height="40"
          width="40"
        />
        {children || (
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Whilter AI
          </Typography>
        )}
      </Box>

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
