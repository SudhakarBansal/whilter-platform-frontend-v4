import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";

export function LipSyncMediaPanel() {
  return (
    <FileUploadWrapper
      type="video"
      label="Source Video"
      heading="Upload Source Video"
      subheading="Add your Files here"
      footer="Only support .mp4 and Video files"
      acceptedFormats={[".mp4"]}
      maxFileSize={10}
      // onUpload={handleUpload}               // Called after successful upload
      // onFileSelected={handleFileSelected}   // Called when file is selected
      // onFileRemoved={handleFileRemoved}     // Called when uploaded file is removed
    />
  );
}
