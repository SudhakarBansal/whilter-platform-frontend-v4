import { Box, Typography, Avatar } from '@mui/material';
import { FolderCardProps } from '@whilter/ui/types';

export function FolderCard({ title, projectCount, avatars }: FolderCardProps) {
    return (
        <Box className="relative h-60 w-72 rounded-2xl overflow-hidden">
            {/* Custom SVG Background */}
            <svg
                viewBox="0 0 256 240"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2E51C0" />
                        <stop offset="100%" stopColor="#101F4E" />
                    </linearGradient>
                </defs>
                <path
                    d="M16 0 
                       C 8 0, 0 8, 0 16 
                       L 0 224 
                       C 0 232, 8 240, 16 240 
                       L 240 240 
                       C 248 240, 256 232, 256 224 
                       L 256 60 
                       C 256 52, 248 44, 240 44 
                       L 142 44 
                       C 138 44, 134 42, 132 38 
                       L 118 12 
                       C 116 8, 112 6, 108 6 
                       L 16 6 
                       C 8 6, 0 14, 0 22 
                       L 0 16 
                       C 0 8, 8 0, 16 0 Z"
                    fill="url(#bgGradient)"
                    style={{ filter: 'drop-shadow(0px -9px 17px rgba(0, 0, 0, 0.2))' }}
                />
            </svg>

            {/* Footer Section */}
            <Box className="absolute bottom-0 left-0 right-0 bg-white rounded-b-2xl px-5 py-4">
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
                                key={avatar.id || index}
                                src={avatar.imageUrl}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: 10,
                                    zIndex: 30 - index * 10,
                                    bgcolor: avatar.count ? 'transparent' : '#e5e7eb',
                                }}
                                className={`border-2 border-white ${
                                    avatar.count 
                                        ? `text-white font-medium ${avatar.bgColor}` 
                                        : ''
                                }`}
                            >
                                {avatar.count || ''}
                            </Avatar>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}