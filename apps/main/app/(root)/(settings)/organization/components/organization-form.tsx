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
  logoUrl?: string | null;
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
  const handleCreateOrganization = async (data: Organization) => {
    setLoading(true);
    const loadingToastId = toast.loading("Creating organization...");

    try {
      const formData: CreateOrganizationRequest & {
        logoUrl: string | File | null;
      } = {
        ...data,
        logoUrl: selectedFile || data.logoUrl,
      };

      console.log("Creating organization with data:", formData);

      const response = await createOrganization(formData);

      if (response) {
        toast.success("Organization created successfully!");
        router.push("/organization");
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error(`Error creating organization: ${error}`);
    } finally {
      toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  const handleUpdateOrganization = async (
    data: Organization,
    organizationId: string,
  ) => {
    setLoading(true);
    const loadingToastId = toast.loading("Updating organization...");

    try {
      const formData: CreateOrganizationRequest & {
        logoUrl: string | File | null;
      } = {
        ...data,
        logoUrl: selectedFile || data.logoUrl,
      };

      console.log("Updating organization with data:", formData);

      const response = await editOrganization(organizationId, formData);

      if (response) {
        toast.success("Organization updated successfully!");
        router.push("/organization");
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error(`Error updating organization: ${error}`);
    } finally {
      toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  // Usage in your component:
  const handleSubmit = async (data: Organization) => {
    if (isEditing && organizationId) {
      await handleUpdateOrganization(data, organizationId);
    } else {
      await handleCreateOrganization(data);
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
