"use client";

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

interface ServiceCardProps {
  title: string;
  image: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  borderRadius: 'rounded-xl',
  aspectRatio: '16/10',
  background: `linear-gradient(to bottom right,${theme.palette.blue[400]}, ${theme.palette.blue[800]})`,
  overflow: 'hidden',
  transition: 'box-shadow 300ms ease-in-out',
  '&:hover': {
    boxShadow: `-8px 5px 76.1px 0px ${alpha(theme.palette.sidebarToggle.default,0.35)}`,
  },
  '&:hover .overlay': {
    height: '100%',
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '35%',
  background: `linear-gradient(to bottom,${alpha(theme.palette.blue[300],0.8)}, ${theme.palette.blue[600]})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'height',
}));

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <OverlayBox className="overlay">
        <CardContent>
          <Typography variant='h4'>
            {title}
          </Typography>
        </CardContent>
      </OverlayBox>
    </StyledCard>
  );
};