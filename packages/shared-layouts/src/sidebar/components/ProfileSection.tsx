import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import type { Theme } from '@mui/material/styles';

interface ProfileSectionProps {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  theme: Theme;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ isOpen, onClick, theme }) => (
  <Box
    onClick={onClick}
    className="p-3 flex items-center gap-2 cursor-pointer"
    sx={{
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      }
    }}
  >
    <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
    {isOpen && (
      <>
        <Box className="flex-1">
          <Typography variant="subtitle2" noWrap>
            Sudhakar
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            m@example.com
          </Typography>
        </Box>
      </>
    )}
  </Box>
);