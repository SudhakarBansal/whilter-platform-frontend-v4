import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Play, Pause, AlertCircle, RotateCcw } from 'lucide-react';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

interface AudioPlayerProps {
    url: string;
    isPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTogglePlayPause: () => void;
    onAudioEnded: () => void;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    url: propUrl,
    isPlaying,
    audioRef,
    onTogglePlayPause,
    onAudioEnded,
}) => {
    const url = "/audio.mp3";
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { wavesurfer, isPlaying: wsIsPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        waveColor: '#a0aec0',
        progressColor: '#1A3586',
        cursorColor: '#1A3586',
        barWidth: 5,
        barRadius: 3,
        normalize: true,
        interact: true,
        hideScrollbar: true,
        url: url,
        plugins: useMemo(() => [Timeline.create()], []),
    });

    // Handle URL validation and audio loading
    useEffect(() => {
        if (!url) {
            setError('No audio URL provided');
            setIsLoading(false);
            return;
        }

        // Reset error state when URL changes
        setError(null);
        setIsLoading(true);

        // Test if the URL is accessible
        const testAudio = new Audio();

        const handleLoadError = () => {
            setError('Failed to load audio file. Please check if the URL is correct and the file exists.');
            setIsLoading(false);
        };

        const handleCanPlay = () => {
            setError(null);
            setIsLoading(false);
        };

        testAudio.addEventListener('error', handleLoadError);
        testAudio.addEventListener('canplay', handleCanPlay);

        testAudio.src = url;
        testAudio.load();

        return () => {
            testAudio.removeEventListener('error', handleLoadError);
            testAudio.removeEventListener('canplay', handleCanPlay);
        };
    }, [url]);

    // Sync external play/pause state with wavesurfer
    useEffect(() => {
        if (wavesurfer && !error) {
            if (isPlaying && !wsIsPlaying) {
                wavesurfer.play();
            } else if (!isPlaying && wsIsPlaying) {
                wavesurfer.pause();
            }
        }
    }, [isPlaying, wsIsPlaying, wavesurfer, error]);

    // Handle wavesurfer events
    useEffect(() => {
        if (!wavesurfer) return;

        const handleFinish = () => {
            wavesurfer.seekTo(0);
            wavesurfer.play();
        };

        const handleSeek = () => {
            // Sync with hidden audio element if needed
            if (audioRef.current) {
                audioRef.current.currentTime = wavesurfer.getCurrentTime();
            }
        };

        const handleReady = () => {
            setIsLoading(false);
            setError(null);
        };

        const handleError = (err: any) => {
            console.error('Wavesurfer error:', err);
            setError('Audio playback error occurred');
            setIsLoading(false);
        };

        wavesurfer.on('finish', handleFinish);
        wavesurfer.on('seeking', handleSeek);
        wavesurfer.on('ready', handleReady);
        wavesurfer.on('error', handleError);

        return () => {
            wavesurfer.un('finish', handleFinish);
            wavesurfer.un('seeking', handleSeek);
            wavesurfer.un('ready', handleReady);
            wavesurfer.un('error', handleError);
        };
    }, [wavesurfer, onAudioEnded, audioRef]);

    const handlePlayPause = useCallback(() => {
        if (wavesurfer && !error) {
            onTogglePlayPause();
        }
    }, [wavesurfer, onTogglePlayPause, error]);

    const handleRestart = useCallback(() => {
        if (wavesurfer && !error) {
            wavesurfer.seekTo(0);
            if (isPlaying) {
                wavesurfer.play();
            }
        }
    }, [wavesurfer, isPlaying, error]);

    const duration = wavesurfer ? wavesurfer.getDuration() : 0;

    // Error state
    if (error) {
        return (
            <div className="flex items-center space-x-4 bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                </div>

                <div className="flex-1">
                    <div className="text-red-700 font-medium">Audio Error</div>
                    <div className="text-red-600 text-sm mt-1">{error}</div>
                </div>

            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <button
                onClick={handlePlayPause}
                disabled={!wavesurfer || isLoading || !!error}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
            >
                {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                )}
            </button>

            <button
                onClick={handleRestart}
                disabled={!wavesurfer || isLoading || !!error}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
                title="Restart from beginning"
            >
                <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex-1 flex items-center space-x-3">
                <div className="flex-1 relative">
                    {(isLoading || !wavesurfer) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded h-15">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                                <span className="text-gray-500 text-sm">
                                    {isLoading ? 'Loading audio...' : 'Loading waveform...'}
                                </span>
                            </div>
                        </div>
                    )}
                    <div
                        ref={containerRef}
                        className={`${(!wavesurfer || isLoading) ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 cursor-pointer`}
                    />
                </div>
            </div>

            <div className="text-sm text-gray-500 font-mono min-w-[80px] text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Hidden audio element for compatibility - muted to prevent double audio */}
            <audio
                ref={audioRef}
                src={url}
                onEnded={onAudioEnded}
                muted
                className="hidden"
            />
        </div>
    );
};