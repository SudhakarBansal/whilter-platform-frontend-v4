import React, { useState } from 'react';
import { Box, List, Divider } from '@mui/material';
import { SidebarProps } from '../types/sidebar.types';
import { SidebarHeader } from './SidebarHeader';
import { MenuItem } from './MenuItem';
import { ProfileSection } from './ProfileSection';
import { ProfileMenu } from './ProfileMenu';
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
