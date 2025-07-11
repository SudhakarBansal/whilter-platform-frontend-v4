import { useState, useCallback } from 'react';
import type { UploadedFile } from '@/types';
import { validateFile } from '@/utils/file-upload-wrapper/fileUploadWrapperUtils';
import { UploadService } from '../services/uploadService';

interface UseFileUploadProps {
    acceptedFormats: string[];
    maxFileSize: number;
    onUpload?: (file: UploadedFile) => void;
    onFileSelected?: (file: File) => void;
}

export const useFileUpload = ({
    acceptedFormats,
    maxFileSize,
    onUpload,
    onFileSelected
}: UseFileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [error, setError] = useState<string>('');

    const handleFileSelect = useCallback((selectedFiles: File[]): void => {
        const selectedFile = selectedFiles[0];
        if (!selectedFile) return;

        const validationError = validateFile(selectedFile, acceptedFormats, maxFileSize);
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

    const removeFile = (): void => {
        setFile(null);
        setError('');
        if (onFileSelected) {
            onFileSelected(null as any);
        }
    };

    const handleUpload = async (): Promise<void> => {
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const uploadResult = await UploadService.uploadFile(file);
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

    const handleDropRejected = (fileRejections: any[]) => {
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
    };

    return {
        file,
        uploading,
        uploadedFile,
        error,
        handleFileSelect,
        removeFile,
        handleUpload,
        handleDropRejected
    };
};
