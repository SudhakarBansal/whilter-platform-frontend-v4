import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { AudioFile } from '@mui/icons-material';
import { AudioPlayer } from './AudioPlayer';
import type { UploadedFile as UploadedFileType } from '@/types';

interface UploadedFileProps {
    uploadedFile: UploadedFileType;
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTogglePlayPause: () => void;
    onAudioEnded: () => void;
}

export const UploadedFile: React.FC<UploadedFileProps> = ({
    uploadedFile,
    isPlaying,
    audioRef,
    onTogglePlayPause,
    onAudioEnded
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" className="text-black text-start mb-2">
                    Uploaded File
                </Typography>
                    <AudioPlayer
                        url={uploadedFile.url}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        onTogglePlayPause={onTogglePlayPause}
                        onAudioEnded={onAudioEnded}
                    />

                    <Typography variant="caption" className="text-gray-500 mt-2 block">
                        URL: {uploadedFile.url}
                    </Typography>
            </CardContent>
        </Card>
    );
};