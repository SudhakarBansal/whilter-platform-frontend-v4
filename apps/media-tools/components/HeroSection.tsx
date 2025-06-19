import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
            sx={{
                minHeight: '300px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                boxShadow: "0px 16px 35.9px 0px #0000004D",
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: {
                        xs: 'url("/bgs/bg-sm.jpg")', // Mobile background
                        md: 'url("/bgs/bg.jpg")'  // Desktop background
                    },
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.8,
                    zIndex: 0,
                }
            }}
            className="relative rounded-lg"
        >

            <Container
                sx={{
                    py: { xs: 6, md: 8 }
                }}
                className="relative z-10"
            >
                <Box
                    className="max-w-3xl text-center md:text-left"
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        className="text-4xl sm:text-5xl font-bold leading-tight mb-6 drop-shadow-lg"
                    >
                        Welcome to Media Tools
                    </Typography>

                    <Typography
                        variant="h5"
                        component="p"
                        className="leading-relaxed opacity-95 drop-shadow-md"
                    >
                        Create and customize media with easy-to-use tools. Get started by selecting a tool below.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;