// components/Sidebar/Sidebar.tsx
import React from 'react';
import { Drawer } from '@mui/material';
import { SidebarProps } from '../types/sidebar.types';
import { SidebarContent } from './SidebarContent';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../constants/sidebar.constants';

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  selectedItem,
  onItemSelect,
  theme
}) => {
  const sidebarWidth = isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          backgroundColor: theme.palette.sidebar.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <SidebarContent
        isOpen={isOpen}
        onToggle={onToggle}
        selectedItem={selectedItem}
        onItemSelect={onItemSelect}
        theme={theme}
      />
    </Drawer>
  );
};