"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { ImageUploader } from "./image-uploader";
import { OrganizationFormFields } from "./organization-form-fields";
import { OrganizationFormActions } from "./organization-form-actions";
import { FormContainer } from "@whilter/forms";
import { toast } from "sonner";
import {
  createOrganization,
  editOrganization,
} from "@/services/actions/organizationService";
import { useRouter } from "next/navigation";
import type {
  CreateOrganizationRequest,
  Organization,
} from "@/types/organization.types";

// Form-specific type that matches what FormContainer expects
interface OrganizationFormDefaultValues {
  id?: string;
  name?: string;
  description?: string | null;
  logoUrl?: string | null; // Only string or null for form defaults
}

interface OrganizationFormProps {
  initialValues?: OrganizationFormDefaultValues;
  isEditing?: boolean;
}

const organizationDefaultValues: OrganizationFormDefaultValues = {
  name: "",
  description: "",
  logoUrl: null,
};

export function OrganizationForm({
  initialValues = organizationDefaultValues,
  isEditing = false,
}: OrganizationFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const organizationId = initialValues.id;
  const handleSubmit = async (data: Organization) => {
    setLoading(true);
    const loadingToastId = toast.loading(
      isEditing ? "Updating organization..." : "Creating organization...",
    );

    try {
      // Create the payload with the selected file
      const formData: CreateOrganizationRequest & {
        logoUrl: string | File | null;
      } = {
        ...data,
        logoUrl: selectedFile || data.logoUrl,
      };

      console.log("Form data:", formData);

      let response: string;

      if (isEditing && organizationId) {
        // Edit existing organization
        response = await editOrganization(organizationId, formData);
      } else {
        // Create new organization
        response = await createOrganization(formData);
      }

      // Show success message
      if (response) {
        toast.success(
          isEditing
            ? "Organization updated successfully!"
            : "Organization created successfully!",
        );
      }

      if (isEditing) {
        router.back();
      } else {
        router.push("/organization");
      }

    } catch (error) {
      console.error("Error processing organization:", error);
      toast.error(
        `Error ${isEditing ? "updating" : "creating"} organization: ${error}`,
      );
    } finally {
      toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  // Validation for editing mode
  if (isEditing && !organizationId) {
    console.error(
      "OrganizationForm: organizationId is required when isEditing is true",
    );
    return (
      <Box className="p-4">
        <div className="text-red-500">
          Error: Organization ID is required for editing mode.
        </div>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col md:flex-row items-center" sx={{ gap: 4 }}>
      <ImageUploader
        onImageSelect={handleImageSelect}
        initialImage={initialValues.logoUrl}
      />

      <Box sx={{ flex: 1 }}>
        <FormContainer onSuccess={handleSubmit} defaultValues={initialValues}>
          <OrganizationFormFields />
          <OrganizationFormActions loading={loading} isEditing={isEditing} />
        </FormContainer>
      </Box>
    </Box>
  );
}
