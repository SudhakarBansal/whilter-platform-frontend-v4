import React from 'react';
import { Typography, IconButton, Button, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FileIcon } from './Fileicons';
import { formatFileSize } from '@/utils/file-upload-wrapper/fileUploadWrapperUtils';

interface SelectedFileProps {
    file: File;
    uploading: boolean;
    onRemove: () => void;
    onUpload: () => void;
}

export const SelectedFile: React.FC<SelectedFileProps> = ({
    file,
    uploading,
    onRemove,
    onUpload
}) => {
    return (
        <>
            <Typography variant="h5" className="text-black mb-2">
                Selected File
            </Typography>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                    <FileIcon fileType={file.type} />
                    <div>
                        <Typography variant="body2" className="text-blue-600">
                            {file.name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                            {formatFileSize(file.size)} MB
                        </Typography>
                    </div>
                </div>
                <IconButton
                    onClick={onRemove}
                    size="small"
                    className="text-red-500 hover:bg-red-50"
                    disabled={uploading}
                >
                    <Close />
                </IconButton>
            </div>

            <div className="mt-4 flex justify-end">
                <Button
                    variant="outlinePrimary"
                    onClick={onUpload}
                    disabled={uploading}
                >
                    {uploading ? (
                        <>
                            <CircularProgress size={20} className="mr-2" />
                            Uploading...
                        </>
                    ) : (
                        'Upload File'
                    )}
                </Button>
            </div>
        </>
    );
};