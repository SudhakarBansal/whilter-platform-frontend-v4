import React from 'react';
import { AudioFile, VideoFile, Image as ImageIcon, Description } from '@mui/icons-material';

interface FileIconProps {
    fileType: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ fileType }) => {
    if (fileType.startsWith('audio')) return <AudioFile className="text-blue-500" />;
    if (fileType.startsWith('video')) return <VideoFile className="text-red-500" />;
    if (fileType.startsWith('image')) return <ImageIcon className="text-green-500" />;
    return <Description className="text-gray-500" />;
};
