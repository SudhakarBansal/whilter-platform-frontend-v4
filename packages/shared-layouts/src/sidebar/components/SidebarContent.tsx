import React, { useState } from 'react';
import { Box, List, Divider } from '@mui/material';
import type { SidebarProps } from '../types/sidebar.types.js';
import { SidebarHeader } from './SidebarHeader.js';
import { MenuItem } from './MenuItem.js';
import { ProfileSection } from './ProfileSection.js';
import { ProfileMenu } from './ProfileMenu.js';
import { menuItems } from '../data/menuItems.data.js';
import { useSidebarExpansion } from '../hooks/useSidebarExpansion.js';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="h-full flex flex-col">
      <SidebarHeader isOpen={isOpen} onToggle={onToggle} theme={theme} />
      <Divider />

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

      <Divider />
      <ProfileSection 
        isOpen={isOpen}
        onClick={handleProfileClick}
        theme={theme}
      />
      <ProfileMenu 
        anchorEl={anchorEl}
        onClose={handleClose}
        theme={theme}
      />
    </Box>
  );
};
