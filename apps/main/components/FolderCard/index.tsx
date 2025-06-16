import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';

interface AvatarData {
    initial: string;
    bgColor: string; // Tailwind class like bg-red-500
}

interface FolderCardProps {
    title: string;
    projectCount: number;
    avatars: AvatarData[];
}

export function FolderCard({ title, projectCount, avatars }: FolderCardProps) {
    return (
        <Box className="relative w-64 h-60 rounded-2xl overflow-hidden">
            {/* Top Polygon Area */}
            <Box
                className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-600"
                sx={{
                    clipPath: 'polygon(42% 0, 56% 18%, 100% 18%, 100% 100%, 0 100%, 0 0)',
                    boxShadow: '0px -9px 17px 0px #00000033',
                }}
            />

            {/* Footer Section */}
            <Box className="absolute bottom-0 left-0 right-0 bg-paper rounded-b-2xl px-5 py-4">
                <Box className="flex items-center justify-between">
                    <Box>
                        <Typography variant="subtitle1" className="text-black">
                            {title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                            {projectCount} Projects
                        </Typography>
                    </Box>

                    {/* Avatar Group */}
                    <Box className="flex items-center -space-x-2">
                        {avatars.map((avatar, index) => (
                            <Avatar
                                key={index}
                                sx={{
                                    width: 28,
                                    height: 28,
                                    fontSize: 12,
                                    zIndex: 30 - index * 10,
                                    bgcolor: 'transparent',
                                }}
                                className={`border-2 border-white text-white font-medium ${avatar.bgColor}`}
                            >
                                {avatar.initial}
                            </Avatar>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
