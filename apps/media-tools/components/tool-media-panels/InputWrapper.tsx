'use client';
import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
    IconButton,
    Card,
    CardContent
} from '@mui/material';
import {
    AudioFile,
    VideoFile,
    Image as ImageIcon,
    Description,
    Close,
    PlayArrow,
    Pause,
    VolumeUp
} from '@mui/icons-material';
import { CloudUpload } from 'lucide-react';

// Type definitions
type FileType = 'audio' | 'video' | 'image' | 'document';

export interface UploadedFile {
    url: string;
    name: string;
}

interface FileUploadWrapperProps {
    type?: FileType;
    heading?: string;
    subheading?: string;
    footer?: string;
    acceptedFormats?: string[];
    maxFileSize?: number; // in MB
    onUpload?: (file: UploadedFile) => void;
    onFileSelected?: (file: File) => void;
    [key: string]: any; // for additional props
}

// File Upload Wrapper Component
const FileUploadWrapper: React.FC<FileUploadWrapperProps> = ({
    type = 'audio',
    heading = 'Upload File',
    subheading = 'Add your file here',
    footer = 'Only support .wav, mp3 and Audio files',
    acceptedFormats = ['.wav', '.mp3', '.m4a'],
    maxFileSize = 10,
    onUpload,
    onFileSelected,
    ...props
}) => {
    // State definitions
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [error, setError] = useState<string>('');
    const [currentPlaying, setCurrentPlaying] = useState<boolean>(false);

    // Refs
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Convert accepted formats to MIME types for dropzone
    const getMimeTypes = (formats: string[] | undefined): string[] => {
        const mimeMap: { [key: string]: string[] } = {
            '.wav': ['audio/wav', 'audio/x-wav'],
            '.mp3': ['audio/mpeg', 'audio/mp3'],
            '.m4a': ['audio/mp4', 'audio/x-m4a'],
            '.mp4': ['video/mp4'],
            '.mov': ['video/quicktime'],
            '.avi': ['video/x-msvideo'],
            '.jpg': ['image/jpeg'],
            '.jpeg': ['image/jpeg'],
            '.png': ['image/png'],
            '.gif': ['image/gif'],
            '.pdf': ['application/pdf'],
            '.doc': ['application/msword'],
            '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        };

        const mimeTypes: string[] = [];
        (formats ?? []).forEach(format => {
            const lowerFormat = format.toLowerCase();
            if (mimeMap[lowerFormat]) {
                mimeTypes.push(...mimeMap[lowerFormat]);
            }
        });
        return mimeTypes;
    };

    // File type icons mapping
    const getFileIcon = (fileType: string): React.ReactElement => {
        if (fileType.startsWith('audio/')) return <AudioFile className="text-blue-500" />;
        if (fileType.startsWith('video/')) return <VideoFile className="text-red-500" />;
        if (fileType.startsWith('image/')) return <ImageIcon className="text-green-500" />;
        return <Description className="text-gray-500" />;
    };

    // Validate file
    const validateFile = (file: File): string | null => {
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        const fileSizeMB = file.size / (1024 * 1024);

        if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
            return `File type ${fileExtension} is not supported. Supported formats: ${acceptedFormats.join(', ')}`;
        }

        if (fileSizeMB > maxFileSize) {
            return `File size exceeds ${maxFileSize}MB limit`;
        }

        return null;
    };

    // Handle file selection
    const handleFileSelect = useCallback((selectedFiles: File[]): void => {
        const selectedFile = selectedFiles[0];
        if (!selectedFile) return;

        const validationError = validateFile(selectedFile);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        setFile(selectedFile);
        if (onFileSelected) {
            onFileSelected(selectedFile);
        }
    }, [acceptedFormats, maxFileSize, onFileSelected]);

    // React Dropzone configuration
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
        onDropRejected: (fileRejections) => {
            const rejection = fileRejections[0];
            if (rejection) {
                const errorCode = rejection.errors[0]?.code;
                if (errorCode === 'file-too-large') {
                    setError(`File size exceeds ${maxFileSize}MB limit`);
                } else if (errorCode === 'file-invalid-type') {
                    setError('File type not supported');
                } else {
                    setError('File upload failed');
                }
            }
        },
        noClick: true,
        noKeyboard: true
    });

    // Get dropzone styles
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

    // Remove file
    const removeFile = (): void => {
        setFile(null);
        setError('');
        if (onFileSelected) {
            onFileSelected(null as any);
        }
    };

    // Mock upload function
    const uploadFile = async (file: File): Promise<UploadedFile> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockS3Url = `https://example-bucket.s3.amazonaws.com/uploads/${file.name}`;
                resolve({ url: mockS3Url, name: file.name });
            }, 2000);
        });
    };

    // Handle upload
    const handleUpload = async (): Promise<void> => {
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const uploadResult = await uploadFile(file);
            setUploadedFile(uploadResult);
            setFile(null);

            if (onUpload) {
                onUpload(uploadResult);
            }
        } catch (error) {
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Audio player controls
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

    // Audio event handlers
    const handleAudioEnded = (): void => {
        setCurrentPlaying(false);
    };

    return (
        <Box>
            {/* Upload Area */}
            <Card>
                <CardContent className="p-8 text-start">
                    <Typography variant="h5" className="text-black mb-2">
                        {heading}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 mb-4">
                        {subheading}
                    </Typography>
                    <div {...getRootProps({ className: getDropzoneStyle() })}>
                        <input {...getInputProps()} />

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
                                    <span className='text-blue-400 hover:underline cursor-pointer font-bold' onClick={open}>
                                        browse
                                    </span>
                                </>
                            )}
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                        </Typography>
                        <Typography variant="body2" className="text-gray-500 mt-1">
                            Max {maxFileSize}MB files are allowed
                        </Typography>
                    </div>
                    <Typography variant="body2" className="text-gray-500 mt-4">
                        {footer}
                    </Typography>
                </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
                <Alert severity="error" className="mt-4">
                    {error}
                </Alert>
            )}

            {/* Selected File */}
            {file && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" className="mb-4">Selected File</Typography>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                {getFileIcon(file.type)}
                                <div>
                                    <Typography variant="body2" className="font-medium">
                                        {file.name}
                                    </Typography>
                                    <Typography variant="caption" className="text-gray-500">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </Typography>
                                </div>
                            </div>
                            <IconButton
                                onClick={removeFile}
                                size="small"
                                className="text-red-500 hover:bg-red-50"
                            >
                                <Close />
                            </IconButton>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="outlinePrimary"
                                onClick={handleUpload}
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
                    </CardContent>
                </Card>
            )}

            {/* Uploaded File with Player */}
            {uploadedFile && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" className="mb-4">Uploaded File</Typography>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <AudioFile className="text-blue-500" />
                                    <Typography variant="body2" className="font-medium">
                                        {uploadedFile.name}
                                    </Typography>
                                </div>
                            </div>

                            {/* Audio Player */}
                            <div className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-sm">
                                <IconButton
                                    onClick={togglePlayPause}
                                    className="text-blue-500 hover:bg-blue-50"
                                >
                                    {currentPlaying ? <Pause /> : <PlayArrow />}
                                </IconButton>

                                <audio
                                    ref={audioRef}
                                    src={uploadedFile.url}
                                    onEnded={handleAudioEnded}
                                    className="hidden"
                                />

                                <div className="flex-1 flex items-center space-x-2">
                                    <VolumeUp className="text-gray-400" />
                                    <div className="h-1 bg-gray-200 rounded-full flex-1">
                                        <div className="h-1 bg-blue-500 rounded-full w-0"></div>
                                    </div>
                                </div>

                                <Typography variant="caption" className="text-gray-500">
                                    0:00 / 0:00
                                </Typography>
                            </div>

                            <Typography variant="caption" className="text-gray-500 mt-2 block">
                                URL: {uploadedFile.url}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            )}

        </Box>
    );
};

export default FileUploadWrapper;