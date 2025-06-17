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
  aspectRatio: '16/10',
  background: `linear-gradient(to bottom right, ${theme.palette.blue[400]}, ${theme.palette.blue[800]})`,
  overflow: 'hidden',
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'translateZ(0)',
  '&:hover': {
    boxShadow: `-8px 5px 76.1px 0px ${alpha(theme.palette.sidebarToggle.default, 0.35)}`,
    transform: 'translateY(-4px)',
  },
  '&:hover .overlay': {
    transform: 'translateY(0)',
  },
  '&:hover .content': {
    top: '50%',
    transform: 'translateY(-35%)',
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  transform: 'translateY(65%)',
  transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: "0px -9px 17px 0px rgba(0,0,0,0.2)",
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(to bottom, ${alpha(theme.palette.blue[400], 0.9)}, ${theme.palette.blue[600]})`,
    transition: 'background 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover::before': {
    background: `linear-gradient(to bottom, ${alpha(theme.palette.blue[300], 0.9)}, ${theme.palette.blue[600]})`,
  },
}));

const ContentBox = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  padding: `${theme.spacing(2)} !important`,
  textAlign: 'center',
  bottom: theme.spacing(2),
  left: 0,
  top: '5%',
  transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1, // Ensure text appears above gradients
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
          transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
      />

      <OverlayBox className="overlay">
        <ContentBox className="content">
          <Typography
            variant="h4"
            component="div"
          >
            {title}
          </Typography>
        </ContentBox>
      </OverlayBox>
    </StyledCard>
  );
};