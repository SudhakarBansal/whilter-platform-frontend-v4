import React from 'react';
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  NotificationsOutlined,
  Group,
} from '@mui/icons-material';
import { LogoutButton } from './LogoutButton';
import type {ProfileMenuProps} from '@whilter/shared-types'

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  onClose,
  theme,
  onMangeUsers,
  user,
  onNavigate
}) => {

  const handleMenuClick = (action: string) => {
    onClose();

    switch (action) {
      case "MANAGE_USERS":
        onMangeUsers?.("/users");
        break;

      case "ACCOUNT":
        onNavigate?.("/account");
        break;

      case "NOTIFICATIONS":
        onNavigate?.("/notifications");
        break;

      default:
        console.warn(`Unhandled action: ${action}`);
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            mt: -1,
            minWidth: 240,
            px: 1,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[4],
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.2,
              fontSize: '0.875rem',
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              transition: 'all 0.2s ease',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem',
                color: theme.palette.text.secondary,
                transition: 'color 0.2s ease',
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'scale(1.02)',

              },
            },
          },
        },
      }}
    >
      {/* Profile Info */}
      <Box className="px-4 py-2">
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
          {user?.user?.email?.split('@')[0] || 'User'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.user?.email}
        </Typography>
      </Box>

      <Divider sx={{ my: 0.5 }} />

      {/* Menu Items */}
      <MenuItem onClick={() => handleMenuClick("MANAGE_USERS")}>
        <Group fontSize="small" />
        <Typography variant="body2">Manage Users</Typography>
      </MenuItem>

      <MenuItem onClick={() => handleMenuClick("ACCOUNT")}>
        <AccountCircle fontSize="small" />
        <Typography variant="body2">Account</Typography>
      </MenuItem>

      <MenuItem onClick={() => handleMenuClick("NOTIFICATIONS")}>
        <NotificationsOutlined fontSize="small" />
        <Typography variant="body2">Notifications</Typography>
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      {/* Logout Button */}
      <Box px={2} py={1}>
        <LogoutButton user={user} onClose={onClose} />
      </Box>
    </Menu>
  )
}
