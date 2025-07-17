'use client';

import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";

export function LipSyncMediaPanel() {
    return (
        <FileUploadWrapper
            type="video"
            label="Source Audio"
            heading="Upload Source Audio"
            subheading="Add your Files here"
            footer="Only support .wav, mp3 and Audio files"
            acceptedFormats={['.mp4']}
            maxFileSize={10}
            // onUpload={handleUpload}               // Called after successful upload
            // onFileSelected={handleFileSelected}   // Called when file is selected
            // onFileRemoved={handleFileRemoved}     // Called when uploaded file is removed
        />
    );
}