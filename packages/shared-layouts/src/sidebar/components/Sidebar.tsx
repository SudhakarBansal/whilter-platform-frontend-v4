// components/Sidebar/Sidebar.tsx
import React from 'react';
import { Drawer } from '@mui/material';
import { SidebarProps } from '../types/sidebar.types.js';
import { SidebarContent } from './SidebarContent.js';
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '../constants/sidebar.constants.js';

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
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.shortest
        }),
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest
          }),
          overflow: 'visible',
          backgroundColor: theme.palette.sidebar.default,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
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