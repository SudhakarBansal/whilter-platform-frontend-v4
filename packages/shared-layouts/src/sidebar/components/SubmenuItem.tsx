import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SubMenuItemProps } from '../types/sidebar.types.js';

export const SubMenuItem: React.FC<SubMenuItemProps> = ({
  subItem,
  selectedItem,
  onItemSelect,
  theme
}) => {
  const SubIcon = subItem.icon;
  const isSubSelected = selectedItem === subItem.id;

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isSubSelected}
        onClick={() => onItemSelect(subItem.id)}
        sx={{
          minHeight: 40,
          pl: 4,
          pr: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center',
            color: `${theme.palette.text.primary}`,
            '& svg': {
              fontSize: '1rem',
            },
          }}
        >
          <SubIcon />
        </ListItemIcon>
        <ListItemText
          primary={subItem.label}
          sx={{
            '& .MuiListItemText-primary': {
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: `${theme.palette.text.primary}`
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
