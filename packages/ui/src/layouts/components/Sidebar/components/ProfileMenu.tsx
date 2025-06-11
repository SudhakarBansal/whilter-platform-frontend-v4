import React from 'react';
import { Menu, MenuItem, Box, Typography, Divider } from '@mui/material';
import { Settings as SettingsIcon, AccountCircle, NotificationsOutlined, Logout } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorEl, onClose, theme }) => (
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
    PaperProps={{
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
    }}
  >
    <Box className="px-4 py-1.5">
      <Typography variant="subtitle2" sx={{ fontSize: '0.875rem' }}>Sudhakar</Typography>
      <Typography variant="caption" color="text.secondary">m@example.com</Typography>
    </Box>
    <Divider />
    <MenuItem onClick={onClose}>
      <SettingsIcon fontSize="small" />
      Settings
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