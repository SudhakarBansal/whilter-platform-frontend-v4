import React, { useState } from 'react';
import { Typography, Card, CardContent, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { AudioPlayer } from './AudioPlayer';
import type { UploadedFile as UploadedFileType } from '@/types';
import { VideoPlayer } from './VideoPlayer';
import { FileIcon } from './Fileicons';

interface UploadedFileProps {
    uploadedFile: UploadedFileType;
    isPlaying: boolean;
    mediaRef: React.RefObject<HTMLAudioElement | HTMLVideoElement>;
    onTogglePlayPause: () => void;
    onMediaEnded: () => void;
    onRemove: () => void;
    mediaType: string;
}

export const UploadedFile: React.FC<UploadedFileProps> = ({
    uploadedFile,
    isPlaying,
    mediaRef,
    onTogglePlayPause,
    onMediaEnded,
    onRemove,
    mediaType
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        onRemove();
        setShowDeleteDialog(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    {/* Header with file info and actions */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-3">
                                <FileIcon fileType={mediaType} />
                                <div>
                                    <Typography variant="body2" className="text-blue-600">
                                        {uploadedFile.name}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <IconButton
                                onClick={handleDeleteClick}
                                size="small"
                                className="text-red-500 hover:bg-red-50"
                                title="Remove file"
                            >
                                <Close />
                            </IconButton>
                        </div>
                    </div>

                    {/* Media Player */}
                    {mediaType === 'audio' ? (
                        <AudioPlayer
                            url={uploadedFile.url}
                            isPlaying={isPlaying}
                            mediaRef={mediaRef}
                            onTogglePlayPause={onTogglePlayPause}
                            onMediaEnded={onMediaEnded}
                        />
                    ) : (
                        <VideoPlayer
                            url={uploadedFile.url}
                            isPlaying={isPlaying}
                            mediaRef={mediaRef as React.RefObject<HTMLVideoElement>}
                            onTogglePlayPause={onTogglePlayPause}
                            onMediaEnded={onMediaEnded}
                        />
                    )}
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onClose={handleDeleteCancel}>
                <DialogTitle className='text-error-dark'>Remove Uploaded File</DialogTitle>
                <DialogContent>
                    <Typography className='text-primary-dark'>
                        Are you sure you want to remove "{uploadedFile.name}"?
                        This action cannot be undone and you'll need to upload a new file.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlinePrimary' onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="flatSecondary"
                        autoFocus
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};