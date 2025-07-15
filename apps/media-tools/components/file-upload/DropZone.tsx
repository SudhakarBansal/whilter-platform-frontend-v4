import React from 'react';
import { Typography } from '@mui/material';
import { CloudUpload } from 'lucide-react';

interface DropZoneProps {
    isDragActive: boolean;
    isDragAccept: boolean;
    isDragReject: boolean;
    onBrowseClick: () => void;
    maxFileSize: number;
}

export const DropZone: React.FC<DropZoneProps> = ({
    isDragActive,
    isDragAccept,
    isDragReject,
    onBrowseClick,
    maxFileSize,
}) => {
    const getDropzoneStyle = () => {
        let baseStyle = 'border-2 border-dashed rounded-[12px] p-8 text-center transition-all duration-200';

        if (isDragAccept) {
            return `${baseStyle} border-green-400 bg-green-50`;
        }
        if (isDragReject) {
            return `${baseStyle} border-red-400 bg-red-50`;
        }
        if (isDragActive) {
            return `${baseStyle} border-blue-400 bg-blue-50`;
        }

        return `${baseStyle} border-gray-400 hover:border-blue-400`;
    };

    return (
        <div className={getDropzoneStyle()}>
            <CloudUpload size={50} className="mx-auto text-2xl mb-4 text-blue-400" />
            <Typography variant="body1" className="text-gray-600">
                {isDragActive ? (
                    isDragAccept ? (
                        "Drop the file here..."
                    ) : (
                        "File not supported..."
                    )
                ) : (
                    <>
                        Drag your file or{' '}
                        <span className='text-blue-400 hover:underline cursor-pointer font-bold' onClick={onBrowseClick}>
                            browse
                        </span>
                    </>
                )}
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
                Max {maxFileSize}MB files are allowed
            </Typography>
        </div>
    );
};
