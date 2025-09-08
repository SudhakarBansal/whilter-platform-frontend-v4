import type { CampaignFormValues, MediaType } from "@/model/formInitialValues";
import { useFormContext, useWatch } from "@whilter/forms";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TextFieldElement } from "@whilter/forms";
import { MediaTypeCard } from "./MediaTypeSelector";
import Button from "@mui/material/Button";
import FileUploadWrapper from "../file-upload/FileUploadWrapper";
import type { UploadedFile } from "@/types/fileUploadWrapper.types";

export const CampaignFormContent = () => {
  const { setValue } = useFormContext<CampaignFormValues>();

  // Handle file upload - this is called after successful S3 upload
  function handleUpload(uploadedFile: UploadedFile) {
    console.log("File uploaded successfully:", uploadedFile);
    // Set the S3 file path/URL as referenceDoc
    setValue("referenceDoc", uploadedFile.url);
  }

  // Handle file selection - this is called when file is selected but not yet uploaded
  function handleFileSelected(file: File) {
    console.log("File selected:", file);
    // Clear the referenceDoc field when a new file is selected but not uploaded yet
    setValue("referenceDoc", "");
  }

  // Handle file removal
  function handleFileRemoved(removedFile: UploadedFile) {
    console.log("File removed:", removedFile);
    // Clear the referenceDoc field when file is removed
    setValue("referenceDoc", "");
  }
  // Watch the mediaType field to conditionally render components
  const selectedMediaType = useWatch({ name: "mediaType" });

  const handleMediaTypeSelect = useCallback(
    (mediaType: MediaType) => {
      setValue("mediaType", mediaType);
    },
    [setValue],
  );

  return (
    <Stack spacing={5}>
      <Box>
        <Typography variant="h5" component="h2" mb={1}>
          Campaign Name
        </Typography>
        <TextFieldElement
          name="campaignName"
          variant="outlined"
          placeholder="Enter your campaign name"
          size="small"
          autoComplete="off"
          required={true}
          className="max-w-md w-full"
        />
      </Box>

      {/* File Upload Section */}
      <Box>
        <FileUploadWrapper
          type="document"
          label="Reference Document"
          heading="Reference Document (Optional)"
          subheading="Upload supporting files for your campaign"
          footer="Supported formats: PDF, DOCX, CSV (max 10MB)"
          acceptedFormats={[".pdf", ".docx", ".csv"]}
          maxFileSize={10}
          onUpload={handleUpload}
          onFileSelected={handleFileSelected}
          onFileRemoved={handleFileRemoved}
        />
      </Box>

      <Box>
        <MediaTypeCard
          selectedMediaType={selectedMediaType}
          onSelect={handleMediaTypeSelect}
        />
      </Box>

      <Box textAlign="center" mt={4}>
        <Button variant="flatPrimary" type="submit" size="medium">
          Save and Continue
        </Button>
      </Box>
    </Stack>
  );
};
