import React from 'react';
import {
    Stack,
    Typography,
    Box,
} from '@mui/material';
import { otherToolsCardData } from '@/lib/otherToolsCard.data';
import { OtherToolsCard } from './OtherToolsCard';

// Main Grid Component
const OtherToolsCardGrid: React.FC = () => {
    return (
        <Box className="w-full">
            <Stack direction="row" alignItems="center" className="mb-6">
                <Typography variant="h2" component="h2">
                    Other Tools
                </Typography>
            </Stack>

            {/* Cards Grid */}
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {otherToolsCardData.map((cardData) => (
                    <OtherToolsCard key={cardData.id} data={cardData} />
                ))}
            </Box>
        </Box>
    );
};

export default OtherToolsCardGrid;