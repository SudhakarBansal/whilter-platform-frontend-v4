"use client";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { TextFieldElement, FormContainer } from "@whilter/forms";
import { useState } from "react";
import {
  campaignFormInitialValues,
  type CampaignFormValues,
} from "../../model/formInitialValues";
import FileUploadWrapper from "../file-upload/FileUploadWrapper";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import ImageIcon from "@mui/icons-material/Image";

// Media type options with consistent structure
const mediaTypes = [
  {
    id: "image",
    label: "Image",
    icon: ImageIcon,
  },
  {
    id: "video",
    label: "Video",
    icon: VideoCameraFrontIcon,
  },
] as const;

type MediaType = (typeof mediaTypes)[number]["id"];

interface AddNewCampaignProps {
  onSubmit?: (data: CampaignFormValues & { mediaType: MediaType }) => void;
}

export default function AddNewCampaign({
  onSubmit,
}: AddNewCampaignProps): JSX.Element {
  const [selectedMediaType, setSelectedMediaType] =
    useState<MediaType>("image");

  const handleFormSubmit = (data: CampaignFormValues) => {
    const formDataWithMediaType = {
      ...data,
      mediaType: selectedMediaType,
    };

    if (onSubmit) {
      onSubmit(formDataWithMediaType);
    } else {
      console.log("Form submitted:", formDataWithMediaType);
    }
  };

  const handleMediaTypeSelect = (mediaType: MediaType) => {
    setSelectedMediaType(mediaType);
  };

  return (
    <FormContainer<CampaignFormValues>
      defaultValues={campaignFormInitialValues}
      onSuccess={handleFormSubmit}
    >
      <Stack spacing={5}>
        <Box>
          <Typography variant="h5" mb={1}>
            Campaign Name
          </Typography>
          <TextFieldElement
            name="campaignName"
            variant="outlined"
            placeholder="Enter your campaign name"
            size="small"
            autoComplete="off"
            required
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
          />
        </Box>

        {/* Media Type Selection */}
        <Box>
          <Typography variant="h5" component="h2" mb={1}>
            Media Type
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
              backgroundColor: "background.paper",
              padding: 4,
              borderRadius: 2,
            }}
          >
            {mediaTypes.map((mediaType) => {
              const IconComponent = mediaType.icon;
              const isSelected = selectedMediaType === mediaType.id;

              return (
                <Card
                  key={mediaType.id}
                  onClick={() => handleMediaTypeSelect(mediaType.id)}
                  sx={{
                    width: 200,
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    border: 2,
                    borderColor: isSelected ? "transparent" : "#D6D6D6",
                    background: isSelected
                      ? "linear-gradient(180deg, #2343AA 0%, #0E1B44 100%)"
                      : "#F4F4F4",
                    color: isSelected ? "#ffffff" : "#707070",
                    boxShadow: isSelected ? 10 : 0,
                    "&:hover": {
                      borderColor: isSelected ? "" : "gray.400",
                      background: isSelected ? "" : "#D6D6D6",
                    },
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                >
                  <CardContent>
                    <Box sx={{ mb: 1 }}>
                      <IconComponent
                        sx={{
                          fontSize: 58,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        color: isSelected ? "#ffffff" : "#707070",
                      }}
                    >
                      {mediaType.label}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        <Box textAlign="center" mt={4}>
          <Button variant="flatPrimary" type="submit" size="medium">
            Save and Continue
          </Button>
        </Box>
      </Stack>
    </FormContainer>
  );
}
