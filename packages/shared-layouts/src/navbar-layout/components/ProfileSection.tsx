import React from 'react';
import { Box, Avatar } from '@mui/material';
import type {ProfileSectionProps } from "@whilter/shared-types";


export const ProfileSection: React.FC<ProfileSectionProps> = ({onClick, theme, user }) => (
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
      {user?.user?.email?.charAt(0)?.toUpperCase()}
    </Avatar>
  </Box>
);