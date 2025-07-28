import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { User } from "@whilter/shared-types";

interface ProfileSectionProps {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  theme: Theme;
  user?: User;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ isOpen, onClick, theme, user }) => (
  <Box
    onClick={onClick}
    className="p-2 flex items-center gap-2 cursor-pointer rounded-full"
    sx={{
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      }
    }}
  >
    <Avatar sx={{ width: 35, height: 35 }}>
      {user?.email?.charAt(0)?.toUpperCase()}
    </Avatar>
  </Box>
);