"use client";

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

interface ServiceCardProps {
  title: string;
  image: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <Card
      className='group relative cursor-pointer bg-transparent rounded-lg aspect-[16/10] bg-gradient-to-br from-blue-400 to-blue-800 hover:shadow-[-8px_5px_76.1px_0px_rgba(240,74,243,0.35)] overflow-hidden'
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        className='h-full w-full object-cover'
      />

      <Box
        className="overlay flex items-center justify-center absolute bottom-0 left-0 right-0 group-hover:h-full"
        sx={{
          height: '35%',
          background: (theme) => `linear-gradient(to bottom, ${theme.palette.blue[300]}CC, ${theme.palette.blue[600]}FF)`,
          boxShadow: '-8px 5px 76.1px 0px rgba(240, 74, 243, 0.35)',
          transition: 'height 300ms ease-in-out',
        }}
      >
        <CardContent>
          <Typography
            className="text-white font-normal text-2xl"
          >
            {title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};