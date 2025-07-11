export type FileType = 'audio' | 'video' | 'image' | 'document';

export interface UploadedFile {
    url: string;
    name: string;
}

export interface FileUploadWrapperProps {
    type?: FileType;
    heading?: string;
    subheading?: string;
    footer?: string;
    acceptedFormats: string[];
    maxFileSize?: number; // in MB
    onUpload?: (file: UploadedFile) => void;
    onFileSelected?: (file: File) => void;
    [key: string]: any; // for additional props
}