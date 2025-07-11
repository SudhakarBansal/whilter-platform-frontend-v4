import { useState, useRef } from 'react';

export const useAudioPlayer = () => {
    const [currentPlaying, setCurrentPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlayPause = (): void => {
        if (!audioRef.current) return;

        if (currentPlaying) {
            audioRef.current.pause();
            setCurrentPlaying(false);
        } else {
            audioRef.current.play();
            setCurrentPlaying(true);
        }
    };

    const handleAudioEnded = (): void => {
        setCurrentPlaying(false);
    };

    return {
        currentPlaying,
        audioRef,
        togglePlayPause,
        handleAudioEnded
    };
};
