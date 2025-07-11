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
                <Typography variant="h6" className="mb-4">Uploaded File</Typography>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <AudioFile className="text-blue-500" />
                            <Typography variant="body2" className="font-medium">
                                {uploadedFile.name}
                            </Typography>
                        </div>
                    </div>

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
                </div>
            </CardContent>
        </Card>
    );
};