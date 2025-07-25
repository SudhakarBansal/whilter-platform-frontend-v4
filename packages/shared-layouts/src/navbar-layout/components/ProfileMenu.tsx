import React from 'react';
import { Menu, MenuItem, Box, Typography, Divider } from '@mui/material';
import { Settings as SettingsIcon,AccountCircle, NotificationsOutlined, Logout } from '@mui/icons-material';

import type { Theme } from '@mui/material/styles';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
  onSettings?: (path: string) => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorEl, onClose, theme, onSettings }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    slotProps={{
      paper: {
        sx: {
          mt: -1,
          minWidth: 220,
          backgroundColor: theme.palette.background.default,
          '& .MuiMenuItem-root': {
            minHeight: '40px',
            fontSize: '0.875rem',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              marginRight: '0.5rem'
            }
          }
        }
      }
    }}
  >
    <Box className="px-4 py-1.5">
      <Typography variant="subtitle2" sx={{ fontSize: '0.875rem' }}>Guest</Typography>
      <Typography variant="caption" color="text.secondary">m@example.com</Typography>
    </Box>
    <Divider />
    <MenuItem
      onClick={() => {
        onSettings?.("/users"); 
        // onClose();
      }}
    >
      <SettingsIcon fontSize="small" />
      Manage Users
    </MenuItem>
    <MenuItem onClick={onClose}>
      <AccountCircle fontSize="small" />
      Account
    </MenuItem>
    <MenuItem onClick={onClose}>
      <NotificationsOutlined fontSize="small" />
      Notifications
    </MenuItem>
    <Divider />
    <MenuItem onClick={onClose}>
      <Logout fontSize="small" />
      Log out
    </MenuItem>
  </Menu>
);