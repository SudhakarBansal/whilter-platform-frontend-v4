import { OtherToolsCardProps } from '@/types';
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';

export const OtherToolsCard: React.FC<OtherToolsCardProps> = ({ data }) => {
    return (
        <Card className="relative transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer overflow-hidden flex flex-col h-full group">
            {/* Gradient overlay */}
            <Box className="absolute inset-0 bg-gradient-to-b from-blue-300/80 to-blue-600 opacity-0 group-hover:opacity-90 transition-all duration-300 z-10" />

            {/* Image section */}
            <Box className="relative overflow-hidden">
                <CardMedia
                    component="img"
                    image={`${data.image}?w=400&h=200&fit=crop`}
                    alt={data.title}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
                />
            </Box>

            {/* Content section */}
            <CardContent className="relative z-20 bg-paper group-hover:bg-transparent p-6 flex-1 flex flex-col transition-all duration-300 justify-center">
                <Typography
                    variant="subtitle1"
                    component="h3"
                    className="font-bold text-blue-400 group-hover:text-white mb-2 transition-all duration-300"
                >
                    {data.title}
                </Typography>
                <Typography
                    variant="body2"
                    className="text-gray-400 group-hover:text-gray-100 transition-all duration-300"
                >
                    {data.description}
                </Typography>
            </CardContent>
        </Card>
    );
};