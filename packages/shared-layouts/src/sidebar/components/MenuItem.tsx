import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Collapse,
  List
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MenuItemProps } from '../types/sidebar.types.js';
import { SubMenuItem } from './SubmenuItem.js';

export const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isOpen,
  selectedItem,
  onItemSelect,
  isExpanded: itemExpanded,
  onExpandToggle,
  theme
}) => {
  const Icon = item.icon;
  const isSelected = selectedItem === item.id || selectedItem.startsWith(item.id + '-');
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems && isOpen) {
      onExpandToggle(item.id);
    } else {
      onItemSelect(item.id);
    }
  };

  const mainListItem = (
    <ListItem disablePadding>
      <ListItemButton
        selected={isSelected}
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: isOpen ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isOpen ? 3 : 'auto',
            justifyContent: 'center',
            color: `${theme.palette.text.primary}`
          }}
        >
          <Icon />
        </ListItemIcon>
        {isOpen && (
          <>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }
              }}
            />
            {hasSubItems && (
              itemExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </>
        )}
      </ListItemButton>
    </ListItem>
  );

  if (!isOpen) {
    return (
      <Tooltip
        title={item.label}
        placement="right"
        arrow
      >
        {mainListItem}
      </Tooltip>
    );
  }

  return (
    <Box>
      {mainListItem}
      {hasSubItems && isOpen && (
        <Collapse in={itemExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems!.map((subItem) => (
              <SubMenuItem
                key={subItem.id}
                subItem={subItem}
                selectedItem={selectedItem}
                onItemSelect={onItemSelect}
                theme={theme}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};
