import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon } from '@mui/icons-material';
import { SidebarHeaderProps } from '../types/sidebar.types';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isOpen,
  onToggle,
  theme
}) => (
  <Box className="p-4 flex items-center justify-between min-h-[64px]">
    {isOpen && (
      <Typography variant="h6">
        Dashboard
      </Typography>
    )}
    <IconButton
      onClick={onToggle}
      size="small"
      className="ml-auto"
      sx={{
        backgroundColor: `${theme.palette.text.primary}`,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: `${theme.palette.text.secondary}`,
        },
      }}
    >
      {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
    </IconButton>
  </Box>
);
