import { useState, useRef } from 'react';

export const useMediaPlayer = () => {
    const [currentPlaying, setCurrentPlaying] = useState<boolean>(false);
    const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);

    const togglePlayPause = (): void => {
        if (!mediaRef.current) return;

        if (currentPlaying) {
            mediaRef.current.pause();
            setCurrentPlaying(false);
        } else {
            mediaRef.current.play();
            setCurrentPlaying(true);
        }
    };

    const handleMediaEnded = (): void => {
        setCurrentPlaying(false);
    };

    return {
        currentPlaying,
        mediaRef,
        togglePlayPause,
        handleMediaEnded
    };
};
