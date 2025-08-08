"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { Button, Stack, Box, Typography, Paper, Alert } from "@mui/material";
import { CloudUpload, Image as ImageIcon } from "@mui/icons-material";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { FormContainer, TextFieldElement } from "@whilter/forms";

interface OrganizationFormData {
  name: string;
  description: string;
  logo: File;
}

const organizationDefaultValues = {
  name: "",
  description: "",
};

// Image validation constants
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export default function NewOrganizationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const breadcrumbs = buildBreadcrumbs([
    { label: "Organization", href: "/organization" },
    { label: "New Organization", href: "/organization/new" },
  ]);

  const handleCancel = () => {
    router.push("/organization");
  };

  const validateImageFile = (file: File): string | null => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Please select a valid image file (JPEG, PNG, GIF, or WebP)";
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }

    // Additional check for file extension (extra security)
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    if (!allowedExtensions.includes(fileExtension)) {
      return "Invalid file extension. Please use JPG, PNG, GIF, or WebP files";
    }

    return null; // No errors
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file", file);

    setUploadError(null); // Clear previous errors

    if (!file) return;

    // Validate the file
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };

    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.");
      setSelectedFile(null);
      setSelectedImage(null);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    setUploadError(null); // Clear errors when opening file dialog
    fileInputRef.current?.click();
  };

  const handleSubmit = async (data: OrganizationFormData) => {
    setLoading(true);
    const formData = {
      ...data,
      logo: selectedFile,
    };
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(formData);
    setLoading(false);
  };

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Create New Organization"
      description="Add a new organization to the system"
      config={pageLayoutPresets.dashboard}
    >
      <Box className="flex flex-col md:flex-row items-center" sx={{ gap: 4 }}>
        {/* Left side - Image Upload */}
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
              <Box
                component="img"
                src={selectedImage}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
                alt="Organization logo preview"
              />
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 48, color: "blue.400", mb: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Click to upload logo
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  textAlign="center"
                >
                  JPG, PNG, GIF, WebP up to 5MB
                </Typography>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Paper>

          {/* Error message */}
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

        {/* Right side - Form */}
        <Box sx={{ flex: 1 }}>
          <FormContainer
            onSuccess={handleSubmit}
            defaultValues={organizationDefaultValues}
          >
            <Stack spacing={3}>
              <TextFieldElement
                name="name"
                label="Organization Name"
                placeholder="Enter a Valid Organization Name"
                required
                autoFocus
                autoComplete="off"
              />

              <TextFieldElement
                name="description"
                label="Organization Description"
                placeholder="Enter description"
                autoComplete="off"
                multiline
                rows={4}
              />

              <Stack className="flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-4">
                <Button
                  onClick={handleCancel}
                  variant="outlineSecondary"
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  sx={{ flex: 1 }}
                >
                  {loading ? "Creating..." : "Create Organization"}
                </Button>
              </Stack>
            </Stack>
          </FormContainer>
        </Box>
      </Box>
    </AdminLayout>
  );
}
