"use client";

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

interface ServiceCardProps {
  title: string;
  image: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <Card className='relative cursor-pointer bg-transparent rounded-lg hover:[&_.overlay]:h-full aspect-[4/3]'
      sx={{
        background: 'linear-gradient(180deg, #0C2C88 0%, #010512 100%)',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        className=' h-full w-full object-cover'
      />

      <Box
        className="overlay flex items-center justify-center absolute bottom-0 left-0 right-0 "
        sx={{
          height: '35%',
          background: (theme) => `linear-gradient(to bottom, ${theme.palette.blue[300]}CC, ${theme.palette.blue[600]}FF)`,
          boxShadow: '-8px 5px 76.1px 0px rgba(240, 74, 243, 0.35)',
          transition: 'height 300ms ease-in-out',
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
          >
            {title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};