import React, { useState } from "react";
import { Box } from "@mui/material";
import { ImageUploader } from "./image-uploader";
import { OrganizationFormFields } from "./organization-form-fields";
import { OrganizationFormActions } from "./organization-form-actions";
import { FormContainer } from "@whilter/forms";
import { toast } from "sonner";

export interface OrganizationFormData {
  name: string;
  description: string;
}

interface OrganizationFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  initialValues?: OrganizationFormData;
  isEditing?: boolean;
}

const organizationDefaultValues: OrganizationFormData = {
  name: "",
  description: "",
};

export function OrganizationForm({
  onCancel,
  onSuccess,
  initialValues = organizationDefaultValues,
  isEditing = false,
}: OrganizationFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (data: OrganizationFormData) => {
    setLoading(true);
    const loadingToastId = toast.loading("Creating organization...");

    try {
      const formData = {
        ...data,
        logo: selectedFile,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Form data:", formData);
      toast.dismiss(loadingToastId);
      toast.success("Organization created successfully!");

      onSuccess();
    } catch (error) {
      console.error("Error Adding Organization : ", error);
      toast.error("Error Adding Organization : " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <Box className="flex flex-col md:flex-row items-center" sx={{ gap: 4 }}>
      <ImageUploader onImageSelect={handleImageSelect} />

      <Box sx={{ flex: 1 }}>
        <FormContainer onSuccess={handleSubmit} defaultValues={initialValues}>
          <OrganizationFormFields />
          <OrganizationFormActions
            loading={loading}
            onCancel={onCancel}
            isEditing={isEditing}
          />
        </FormContainer>
      </Box>
    </Box>
  );
}
