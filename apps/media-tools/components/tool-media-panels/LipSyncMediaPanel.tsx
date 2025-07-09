'use client';
import FileUploadWrapper, { type UploadedFile } from "./InputWrapper";

// This handles the uploaded file (after upload completion)
function handleUpload(uploadedFile:UploadedFile) {
    console.log("File uploaded successfully:", uploadedFile);
    // This is the uploaded file with its URL
    console.log(`File: ${uploadedFile.name}, URL: ${uploadedFile.url}`);
}

// This handles the selected file (before upload)
function handleFileSelected(file: File) {
    console.log("File selected:", file);
    // This is the raw File object selected by the user
    console.log(`Selected: ${file.name}, Size: ${file.size} bytes`);
}

export function LipSyncMediaPanel() {
    return (
            <FileUploadWrapper
                type="audio"
                heading="Upload Source Audio"
                subheading="Add your Files here, and you can upload up to 5 files max"
                footer="Only support .wav, mp3 and Audio files"
                acceptedFormats={['.wav', '.mp3', '.m4a']}
                maxFileSize={10}
                onUpload={handleUpload}           // Called after successful upload
                onFileSelected={handleFileSelected} // Called when file is selected
            />
    );
}