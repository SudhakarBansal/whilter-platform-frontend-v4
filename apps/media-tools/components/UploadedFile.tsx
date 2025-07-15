import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { AudioPlayer } from './AudioPlayer';
import type { UploadedFile as UploadedFileType } from '@/types';
import { VideoPlayer } from './VideoPlayer';

interface UploadedFileProps {
    uploadedFile: UploadedFileType;
    isPlaying: boolean;
    mediaRef: React.RefObject<HTMLAudioElement | HTMLVideoElement>;
    onTogglePlayPause: () => void;
    onMediaEnded: () => void;
    mediaType: string;
}

export const UploadedFile: React.FC<UploadedFileProps> = ({
    uploadedFile,
    isPlaying,
    mediaRef,
    onTogglePlayPause,
    onMediaEnded,
    mediaType
}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" className="text-black text-start mb-2">
                    Uploaded File
                </Typography>
                {
                    mediaType === 'audio' ?
                        <AudioPlayer
                            url={uploadedFile.url}
                            isPlaying={isPlaying}
                            mediaRef={mediaRef}
                            onTogglePlayPause={onTogglePlayPause}
                            onMediaEnded={onMediaEnded}
                        />
                        :
                        <VideoPlayer
                            url={uploadedFile.url}
                            isPlaying={isPlaying}
                            mediaRef={mediaRef as React.RefObject<HTMLVideoElement>}
                            onTogglePlayPause={onTogglePlayPause}
                            onMediaEnded={onMediaEnded}
                        />
                }

                <Typography variant="caption" className="text-gray-500 mt-2 block">
                    URL: {uploadedFile.url}
                </Typography>
            </CardContent>
        </Card>
    );
};