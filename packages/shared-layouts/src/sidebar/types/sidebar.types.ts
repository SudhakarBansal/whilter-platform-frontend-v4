// types/sidebar.types.ts
import type { Theme } from '@mui/material';
import React from 'react';

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedItem: string;
  onItemSelect: (item: string) => void;
  theme: Theme;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
}

export interface MenuItemProps {
  item: MenuItem;
  isOpen: boolean;
  selectedItem: string;
  onItemSelect: (item: string) => void;
  isExpanded: boolean;
  onExpandToggle: (itemId: string) => void;
  theme: Theme;
}

export interface SubMenuItemProps {
  subItem: SubMenuItem;
  selectedItem: string;
  onItemSelect: (item: string) => void;
  theme: Theme;
}

export interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: Theme;
}