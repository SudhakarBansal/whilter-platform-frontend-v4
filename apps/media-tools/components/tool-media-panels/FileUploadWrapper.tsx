import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Alert, Card, CardContent } from '@mui/material';
import type { FileUploadWrapperProps } from '@/types';
import { getMimeTypes } from '@/utils/file-upload-wrapper/fileUploadWrapperUtils';
import { useFileUpload,useAudioPlayer } from '@/hooks';
import { DropZone } from '../DropZone';
import { SelectedFile } from '../SelectedFile';
import { UploadedFile } from '../UploadedFile';

const FileUploadWrapper: React.FC<FileUploadWrapperProps> = ({
    type,
    heading,
    subheading,
    footer,
    acceptedFormats,
    maxFileSize = 10,
    onUpload,
    onFileSelected,
    ...props
}) => {
    const {
        file,
        uploading,
        uploadedFile,
        error,
        handleFileSelect,
        removeFile,
        handleUpload,
        handleDropRejected
    } = useFileUpload({
        acceptedFormats,
        maxFileSize,
        onUpload,
        onFileSelected
    });

    const {
        currentPlaying,
        audioRef,
        togglePlayPause,
        handleAudioEnded
    } = useAudioPlayer();

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone({
        accept: getMimeTypes(acceptedFormats).reduce((acc, mimeType) => {
            acc[mimeType] = [];
            return acc;
        }, {} as { [key: string]: string[] }),
        multiple: false,
        maxSize: maxFileSize * 1024 * 1024,
        onDrop: handleFileSelect,
        onDropRejected: handleDropRejected,
        noClick: true,
        noKeyboard: true
    });

    // Show upload area only when no file is selected and no file is uploaded
    const showUploadArea = !file && !uploadedFile;

    return (
        <Box>
            {/* Upload Area - Only show when no file is selected/uploaded */}
            {showUploadArea && (
                <Card>
                    <CardContent className="p-8 text-start">
                        <Typography variant="h5" className="text-black mb-2">
                            {heading}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mb-4">
                            {subheading}
                        </Typography>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <DropZone
                                isDragActive={isDragActive}
                                isDragAccept={isDragAccept}
                                isDragReject={isDragReject}
                                onBrowseClick={open}
                                maxFileSize={maxFileSize}
                            />
                        </div>
                        <Typography variant="body2" className="text-gray-500 mt-4">
                            {footer}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Selected File - Show when file is selected but not uploaded */}
            {file && !uploadedFile && (
                <Card>
                    <CardContent className="p-8 text-start">
                        <SelectedFile
                            file={file}
                            uploading={uploading}
                            onRemove={removeFile}
                            onUpload={handleUpload}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Error Message */}
            {error && (
                <Alert severity="error" className="mt-4">
                    {error}
                </Alert>
            )}

            {/* Uploaded File with Player - Show when file is uploaded */}
            {uploadedFile && (
                <UploadedFile
                    uploadedFile={uploadedFile}
                    isPlaying={currentPlaying}
                    audioRef={audioRef}
                    onTogglePlayPause={togglePlayPause}
                    onAudioEnded={handleAudioEnded}
                />
            )}
        </Box>
    );
};

export default FileUploadWrapper;