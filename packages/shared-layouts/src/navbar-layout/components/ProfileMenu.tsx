import React from 'react';
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  AccountCircle,
  NotificationsOutlined,
  Logout,
} from '@mui/icons-material';
import type { User } from "@whilter/shared-types";
import type { Theme } from '@mui/material/styles';
import {logout} from '@whilter/api'
import {CharpErrorDetail} from '@whilter/shared-types'
// import toast from ''

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  theme: Theme;
  onSettings?: (path: string) => void;
  user?: User;
}


export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  onClose,
  theme,
  onSettings,
  user,
}) => {

  console.log("profile--menu -- client side");
const handleLogout = async () => {
  onClose();
  if (!user?.refreshToken || !user?.deviceId) {
    console.error("Missing refreshToken or deviceId");
    return;
  }

  const data = {
    refreshToken: user.refreshToken,
    deviceId: user.deviceId,
  };

  try {
    const response = await logout(data);
    if (response.status === 200 || response.status === 201) {
      // router.push('/login');
    } else {
      console.error('Logout failed with status:', response.status);
    }
  } catch (error: any) {
    const err = error as CharpErrorDetail;
    // toast.error(err.message || "Logout failed. Please try again.");
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
    <MenuItem onClick={() => onSettings?.('/users')}>
      <SettingsIcon />
      Manage Users
    </MenuItem>

    <MenuItem onClick={onClose}>
      <AccountCircle />
      Account
    </MenuItem>

    <MenuItem onClick={onClose}>
      <NotificationsOutlined />
      Notifications
    </MenuItem>

    <Divider sx={{ my: 0.5 }} />

    <MenuItem onClick={handleLogout}>
      <Logout sx={{ color: theme.palette.error.main }} />
      <Typography variant="body2" color="error.main">
        Log out
      </Typography>
    </MenuItem>
  </Menu>
)}
