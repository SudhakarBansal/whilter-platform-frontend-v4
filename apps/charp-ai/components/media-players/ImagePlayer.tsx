import React, { useState } from "react";

interface ImagePlayerProps {
  url: string;
  alt?: string;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({ url, alt }) => {
    url = '/logo.png';
  const [error, setError] = useState(false);

  return (
    <div className="w-full flex justify-center">
      {!error ? (
        <img
          src={url}
          alt={alt || "Uploaded Preview"}
          className="w-full max-w-[200px] h-auto rounded-lg object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <div className="text-gray-500 text-sm p-4">
          Failed to load image
        </div>
      )}
    </div>
  );
};
