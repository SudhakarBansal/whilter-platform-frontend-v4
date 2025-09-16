import React, { useState, useRef } from "react";
import { Upload, RotateCcw, Trash2 } from "lucide-react";
import { Tooltip } from "@mui/material";

interface ImageData {
  file: File;
  preview: string;
  name: string;
}

export default function ImageUploader() {
  const [image, setImage] = useState<ImageData | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = (file: File): void => {
    setIsUploading(true);
    console.log("Upload image:", file);
    // Here you would typically upload the file to your server

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      console.log("Upload completed!");
    }, 2000);
  };

  const handleFileSelect = (file: File | null): void => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const imageData = {
            file: file,
            preview: e.target.result as string,
            name: file.name,
          };
          setImage(imageData);

          // Automatically trigger upload when image is selected
          handleUploadImage(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleRemoveImage = (): void => {
    setImage(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChangeImage = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <div className="w-full h-[50vh] bg-white rounded-2xl border-2 border-dashed overflow-hidden relative">
        {!image ? (
          // Upload State
          <div
            className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group ${
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="text-center p-8">
              <div
                className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                  isDragOver
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-400 group-hover:bg-blue-500 group-hover:text-white"
                }`}
              >
                <Upload size={32} />
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {isDragOver ? "Drop your image here" : "Upload an image"}
              </h3>

              <p className="text-gray-500 text-sm mb-4">
                Drag and drop or click to browse
              </p>

              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        ) : (
          // Preview State
          <div className="relative w-full h-full group">
            <img
              src={image.preview}
              alt={image.name}
              className="w-full h-full object-contain"
            />

            {/* Bottom left controls */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <Tooltip title="ReUpload" placement="top" arrow>
                <button
                  type="button"
                  onClick={handleChangeImage}
                  className="bg-white text-gray-700 border border-gray-300 hover:text-blue-400 p-2 rounded-xl transition-all duration-200 hover:border-blue-400"
                >
                  <RotateCcw size={20} />
                </button>
              </Tooltip>

              <Tooltip title="Remove" placement="top" arrow>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-white text-gray-700 border border-gray-300 hover:text-blue-400 p-2 rounded-xl transition-all duration-200 hover:border-blue-400"
                >
                  <Trash2 size={20} />
                </button>
              </Tooltip>
            </div>

            {/* Upload status overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  <span className="text-gray-700 font-medium">
                    Uploading...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
