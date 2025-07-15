import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertCircle } from 'lucide-react';

interface MediaPlayerProps {
    url: string;
    isPlaying: boolean;
    mediaRef: React.RefObject<HTMLVideoElement>;
    onTogglePlayPause: () => void;
    onMediaEnded: () => void;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoPlayer: React.FC<MediaPlayerProps> = ({
    url: propUrl,
    isPlaying,
    mediaRef,
    onTogglePlayPause,
    onMediaEnded,
}) => {
    const url = '/Taj.mp4';
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Handle video loading and events
    useEffect(() => {
        if (!mediaRef.current) return;

        const video = mediaRef.current;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
            setError(null);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handleError = () => {
            setError('Failed to load video file. Please check if the URL is correct and the file exists.');
            setIsLoading(false);
        };

        const handleLoadStart = () => {
            setIsLoading(true);
            setError(null);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('error', handleError);
        video.addEventListener('loadstart', handleLoadStart);
        video.addEventListener('ended', onMediaEnded);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('error', handleError);
            video.removeEventListener('loadstart', handleLoadStart);
            video.removeEventListener('ended', onMediaEnded);
        };
    }, [mediaRef, onMediaEnded]);

    // Sync play/pause state
    useEffect(() => {
        if (!mediaRef.current) return;

        const video = mediaRef.current;

        if (isPlaying) {
            video.play().catch(console.error);
        } else {
            video.pause();
        }
    }, [isPlaying, mediaRef]);

    const handleProgressClick = useCallback((e: React.MouseEvent) => {
        if (!progressRef.current || !mediaRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progress = clickX / rect.width;
        const newTime = progress * duration;

        mediaRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }, [duration, mediaRef]);

    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);

        if (mediaRef.current) {
            mediaRef.current.volume = newVolume;
        }
    }, [mediaRef]);

    const toggleMute = useCallback(() => {
        if (!mediaRef.current) return;

        if (isMuted) {
            mediaRef.current.volume = volume;
            setIsMuted(false);
        } else {
            mediaRef.current.volume = 0;
            setIsMuted(true);
        }
    }, [isMuted, volume, mediaRef]);

    const handleRestart = useCallback(() => {
        if (!mediaRef.current) return;

        mediaRef.current.currentTime = 0;
        setCurrentTime(0);

        if (isPlaying) {
            mediaRef.current.play();
        }
    }, [isPlaying, mediaRef]);

    const handleFullscreen = useCallback(() => {
        if (!mediaRef.current) return;

        if (mediaRef.current.requestFullscreen) {
            mediaRef.current.requestFullscreen();
        }
    }, [mediaRef]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Error state - matching AudioPlayer style
    if (error) {
        return (
            <div className="flex items-center space-x-4 bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                    <div className="text-red-700 font-medium">Video Error</div>
                    <div className="text-red-600 text-sm mt-1">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div >
            {/* Video Container */}
            <div className="relative rounded-md overflow-hidden mb-4">
                <div
                    className="relative"
                >
                    <video
                        ref={mediaRef}
                        src={url}
                        className="w-full h-auto max-h-96 object-contain"
                        onClick={onTogglePlayPause}
                    />

                    {/* Loading overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="flex items-center space-x-2 text-white">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                                <span>Loading video...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Bar - below video */}
            <div className="mb-4 flex justify-center">
                <div
                    ref={progressRef}
                    className="w-full max-w-2xl h-2 bg-gray-200 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                >
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex justify-center">
                <div className="w-full max-w-2xl flex items-center justify-between">
                    {/* Left Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Volume Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleMute}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5" />
                                ) : (
                                    <Volume2 className="w-5 h-5" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 accent-blue-500"
                            />
                        </div>
                    </div>

                    {/* Center Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Restart Button */}
                        <button
                            onClick={handleRestart}
                            disabled={isLoading || !!error}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 transition-colors"
                            title="Restart from beginning"
                        >
                            <RotateCcw className="w-4 h-4 text-gray-600" />
                        </button>

                        {/* Main Play Button */}
                        <button
                            onClick={onTogglePlayPause}
                            disabled={isLoading || !!error}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 transition-colors shadow-lg"
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" />
                            ) : (
                                <Play className="w-6 h-6 text-white ml-1" />
                            )}
                        </button>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Time Display */}
                        <div className="text-sm text-gray-500 font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>

                        {/* Fullscreen Button */}
                        <button
                            onClick={handleFullscreen}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            title="Fullscreen"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};