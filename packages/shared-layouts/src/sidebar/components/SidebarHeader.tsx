import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import type { SidebarHeaderProps } from '../types/sidebar.types';
import Logo from '@whilter/assets/icons/Logo.svg';
import LogoSmall from '@whilter/assets/icons/LogoSmall.svg';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isOpen,
  onToggle,
  theme
}) => (
  <Box className="relative">
    {/* Main header content */}
    <Box className="p-4 flex items-center min-h-[64px]">
      {isOpen ? (
        <img src={Logo.src} alt="Whilter Logo" className="h-full" />
      ) : (
        <img src={LogoSmall.src} alt="Whilter Icon" className="h-8 w-8" />
      )}
    </Box>
    
    {/* Chevron button positioned inside the right edge */}
    <IconButton
      onClick={onToggle}
      size="small"
      className="absolute top-1/2 -translate-y-1/2 right-[-10px] z-50"
      sx={{
        width: 20,
        height: 20,
        backgroundColor: `${theme.palette.sidebarToggle.default}`,
        border: '1px solid',
        borderColor: "divider",
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          backgroundColor: `${theme.palette.sidebarToggle.default}`,
        },
        '& .MuiSvgIcon-root': {
          fontSize: '20px',
          color: `${theme.palette.primary.dark}`,
        }
      }}
    >
      {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </Box>
);