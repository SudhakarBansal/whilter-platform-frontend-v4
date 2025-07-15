'use client';
import type { UploadedFile } from "@/types";
import FileUploadWrapper from "./FileUploadWrapper";

// This handles the uploaded file (after upload completion)
function handleUpload(uploadedFile: UploadedFile) {
    console.log("File uploaded successfully:", uploadedFile);
    // This is the uploaded file with its URL
    console.log(`File: ${uploadedFile.name}, URL: ${uploadedFile.url}`);
}

// This handles the selected file (before upload)
function handleFileSelected(file: File) {
    console.log("File selected:", file);
}

// This handles when an uploaded file is removed
function handleFileRemoved(removedFile: UploadedFile) {
    console.log("File removed:", removedFile);
    // 1. Clean up any related state
    // 2. Call an API to delete the file from server
    // 3. Update any parent component state
    // 4. Show a success message
}

export function VoiceCloneMediaPanel() {
    return (
        <>
            <FileUploadWrapper
                type="audio"
                heading="Upload Source Audio"
                subheading="Add your Files here"
                footer="Only support .wav, mp3 and Audio files"
                acceptedFormats={['.wav', '.mp3', '.m4a']}
                maxFileSize={10}
                onUpload={handleUpload}               // Called after successful upload
                onFileSelected={handleFileSelected}   // Called when file is selected
                onFileRemoved={handleFileRemoved}     // Called when uploaded file is removed
            />

            <FileUploadWrapper
                type="video"
                heading="Upload Source Video"
                subheading="Add your Files here"
                footer="Only support Video Files"
                acceptedFormats={['.mp4']}
                maxFileSize={10}
                onUpload={handleUpload}               // Called after successful upload
                onFileSelected={handleFileSelected}   // Called when file is selected
                onFileRemoved={handleFileRemoved}     // Called when uploaded file is removed
            />
        </>
    );
}