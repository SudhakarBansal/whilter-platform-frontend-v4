"use client";
import React, { useState, useRef } from "react";
import { Box, Typography, Paper, Alert, Button } from "@mui/material";
import { CloudUpload, Image as ImageIcon } from "@mui/icons-material";
import { validateImageFile } from "@/utils/image-validation";

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  initialImage?: string;
}

export function ImageUploader({ onImageSelect, initialImage }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError(null);

    if (!file) {
      resetImageState();
      return;
    }

    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      clearFileInput();
      return;
    }

    processImageFile(file);
  };

  const processImageFile = (file: File) => {
    onImageSelect(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };

    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.");
      resetImageState();
    };

    reader.readAsDataURL(file);
  };

  const resetImageState = () => {
    onImageSelect(null);
    setSelectedImage(null);
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    setUploadError(null);
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: { xs: "100%", md: "250px" },
        maxWidth: "250px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "250px",
          border: "2px dashed",
          borderColor: uploadError ? "error.main" : "divider",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          backgroundColor: selectedImage ? "transparent" : "grey.50",
          "&:hover": {
            borderColor: uploadError ? "error.dark" : "primary.main",
            backgroundColor: selectedImage ? "transparent" : "grey.100",
          },
          position: "relative",
          overflow: "hidden",
        }}
        onClick={handleUploadClick}
      >
        {selectedImage ? (
          <ImagePreview src={selectedImage} alt="Organization logo preview" />
        ) : (
          <UploadPlaceholder />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </Paper>

      {uploadError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          <Typography variant="caption" className="text-black">
            {uploadError}
          </Typography>
        </Alert>
      )}

      {selectedImage && !uploadError && (
        <Button
          variant="outlinePrimary"
          size="small"
          onClick={handleUploadClick}
          sx={{ mt: 1, width: "100%" }}
          startIcon={<ImageIcon />}
        >
          Change Image
        </Button>
      )}
    </Box>
  );
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <Box
      component="img"
      src={src}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
      }}
      alt={alt}
    />
  );
}

function UploadPlaceholder() {
  return (
    <>
      <CloudUpload sx={{ fontSize: 48, color: "blue.400", mb: 1 }} />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        Click to upload logo
      </Typography>
      <Typography variant="caption" color="text.disabled" textAlign="center">
        JPG, PNG, GIF, WebP up to 5MB
      </Typography>
    </>
  );
}