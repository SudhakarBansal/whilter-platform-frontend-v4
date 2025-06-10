import React from 'react';
import { Box, List, Divider, Typography } from '@mui/material';
import { SidebarProps } from '../types/sidebar.types';
import { SidebarHeader } from './SidebarHeader';
import { MenuItem } from './MenuItem';
import { menuItems } from '../data/menuItems.data';
import { useSidebarExpansion } from '../hooks/useSidebarExpansion';

interface SidebarContentProps extends Omit<SidebarProps, 'isOpen'> {
  isOpen: boolean;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  isOpen,
  onToggle,
  selectedItem,
  onItemSelect,
  theme
}) => {
  const { isExpanded, handleExpandToggle } = useSidebarExpansion();

  return (
    <Box className="h-full flex flex-col">
      {/* Header */}
      <SidebarHeader
        isOpen={isOpen}
        onToggle={onToggle}
        theme={theme}
      />

      <Divider />

      {/* Navigation Menu */}
      <Box className="flex-1 py-4">
        <List disablePadding>
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isOpen={isOpen}
              selectedItem={selectedItem}
              onItemSelect={onItemSelect}
              isExpanded={isExpanded(item.id)}
              onExpandToggle={handleExpandToggle}
              theme={theme}
            />
          ))}
        </List>
      </Box>

      {/* Footer */}
      {isOpen && (
        <Box className="p-4 border-t border-border">
          <Typography variant="body2" className="text-muted-foreground text-center">
            © 2024 Dashboard
          </Typography>
        </Box>
      )}
    </Box>
  );
};
