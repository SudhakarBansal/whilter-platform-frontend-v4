export const MIME_TYPE_MAP: { [key: string]: string[] } = {
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

export const getMimeTypes = (formats: string[] | undefined): string[] => {
    const mimeTypes: string[] = [];
    (formats ?? []).forEach(format => {
        const lowerFormat = format.toLowerCase();
        if (MIME_TYPE_MAP[lowerFormat]) {
            mimeTypes.push(...MIME_TYPE_MAP[lowerFormat]);
        }
    });
    return mimeTypes;
};

export const validateFile = (file: File, acceptedFormats: string[], maxFileSize: number): string | null => {
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

export const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2);
};

export const getFileExtension = (fileName: string): string => {
    return '.' + fileName.split('.').pop()?.toLowerCase();
};