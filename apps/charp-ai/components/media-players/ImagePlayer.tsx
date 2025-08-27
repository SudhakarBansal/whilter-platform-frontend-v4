import React, { useState } from "react";
import { Maximize, AlertCircle } from "lucide-react";

interface ImagePlayerProps {
    url: string;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({ url }) => {
    url = '/logo.png';
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = () => {
        setError("Failed to load image. Please check the URL or file format.");
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
        setError(null);
    };

    const handleFullscreen = () => {
        const img = document.getElementById("preview-image") as HTMLImageElement;
        if (img?.requestFullscreen) img.requestFullscreen();
    };

    if (error) {
        return (
            <div className="flex items-center space-x-4 bg-red-50 rounded-lg p-4 shadow-sm border border-red-200">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <div className="text-red-600 text-sm">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col items-center">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="ml-2 text-gray-600 text-sm">Loading image...</span>
                </div>
            )}
            <img
                id="preview-image"
                src={url}
                onLoad={handleLoad}
                onError={handleError}
                className={`max-h-96 rounded shadow ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity`}
                alt="Preview"
            />
            <button
                onClick={handleFullscreen}
                className="mt-2 px-3 py-1 text-white text-sm rounded "
            >
                <Maximize className="w-4 h-4 inline mr-1" /> Fullscreen
            </button>
        </div>
    );
};
