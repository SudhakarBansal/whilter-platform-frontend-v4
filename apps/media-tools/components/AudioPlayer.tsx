import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';

interface AudioPlayerProps {
    url: string;
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTogglePlayPause: () => void;
    onAudioEnded: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    url,
    isPlaying,
    audioRef,
    onTogglePlayPause,
    onAudioEnded
}) => {
    return (
        <div className="flex items-center space-x-4 rounded-lg p-3 shadow-sm">
            <IconButton
                onClick={onTogglePlayPause}
                className="text-blue-500 hover:bg-blue-50"
            >
                {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <audio
                ref={audioRef}
                src={url}
                onEnded={onAudioEnded}
                className="hidden"
            />

            <div className="flex-1 flex items-center space-x-2">
                <VolumeUp className="text-gray-400" />
                <div className="h-1 bg-gray-200 rounded-full flex-1">
                    <div className="h-1 bg-blue-500 rounded-full w-0"></div>
                </div>
            </div>

            <Typography variant="caption" className="text-gray-500">
                0:00 / 0:00
            </Typography>
        </div>
    );
};
