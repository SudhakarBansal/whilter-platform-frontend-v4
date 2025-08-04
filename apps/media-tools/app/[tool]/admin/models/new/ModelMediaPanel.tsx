import React from "react";
import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";
import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import {
  TextFieldElement,
  SelectElement,
  useFormContext,
} from "@whilter/forms";
import type { UploadedFile } from "@/types";

export function ModelMediaPanel() {
  const { setValue } = useFormContext();

  const languageOptions = [
    { id: "Hindi", label: "Hindi" },
    { id: "English", label: "English" },
    { id: "Tamil", label: "Tamil" },
    { id: "Telugu", label: "Telugu" },
    { id: "Bengali", label: "Bengali" },
    { id: "Marathi", label: "Marathi" },
    { id: "Gujarati", label: "Gujarati" },
    { id: "Kannada", label: "Kannada" },
    { id: "Malayalam", label: "Malayalam" },
    { id: "Punjabi", label: "Punjabi" },
  ];

  const sampleRateOptions = [
    { id: 16000, label: "16kHz" },
    { id: 22050, label: "22.05kHz" },
    { id: 44100, label: "44.1kHz" },
    { id: 48000, label: "48kHz" },
  ];

  // Handle file upload - this is called after successful S3 upload
  function handleUpload(uploadedFile: UploadedFile) {
    console.log("File uploaded successfully:", uploadedFile);
    // Set the S3 file path/URL as refernceVoice
    setValue("refernceVoice", uploadedFile.url);
  }

  // Handle file selection - this is called when file is selected but not yet uploaded
  function handleFileSelected(file: File) {
    console.log("File selected:", file);
    // Clear the refernceVoice field when a new file is selected but not uploaded yet
    setValue("refernceVoice", "");
  }

  // Handle file removal
  function handleFileRemoved(removedFile: UploadedFile) {
    console.log("File removed:", removedFile);
    // Clear the refernceVoice field when file is removed
    setValue("refernceVoice", "");
  }

  return (
    <Stack spacing={4}>
      {/* Model Name */}
      <Box className="bg-transparent">
        <TextFieldElement
          name="modelName"
          label="Model Name"
          type="text"
          fullWidth
          required
          autoComplete="off"
          placeholder="e.g., Amitabh Bachchan"
          helperText="Enter a unique name for this voice model"
          size="small"
        />
      </Box>

      {/* Reference Voice Upload */}
        <FileUploadWrapper
          type="audio"
          label="Reference Voice"
          heading="Upload Reference Audio"
          subheading="Upload a clear audio sample of the voice"
          footer="Supports .wav, .mp3, .flac formats. Max size: 50MB"
          acceptedFormats={[".wav", ".mp3", ".flac"]}
          maxFileSize={50}
          name="referenceVoice"
          onUpload={handleUpload}
          onFileSelected={handleFileSelected}
          onFileRemoved={handleFileRemoved}
        />

      {/* Language Checkpoints */}
      <Card className="bg-transparent">
        <CardContent>
          <Typography variant="h6" mb={2}>
            Language Checkpoints
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Configure model checkpoints for different languages
          </Typography>

          {/* First Checkpoint (Default) */}
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              p: 3,
              mb: 3,
            }}
          >
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Primary Language (Default)
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  DEFAULT
                </Typography>
              </Box>

              <SelectElement
                name="checkpoints.0.language"
                label="Language"
                options={languageOptions}
                fullWidth
                required
              />

              <TextFieldElement
                name="checkpoints.0.referenceText"
                label="Reference Text"
                fullWidth
                multiline
                rows={3}
                required
                placeholder="Enter reference text in the selected language"
              />

              <Stack direction="row" spacing={2}>
                <TextFieldElement
                  name="checkpoints.0.indexPath"
                  label="Index Path (S3 URL)"
                  fullWidth
                  required
                  autoComplete="off"
                  placeholder="https://s3.amazonaws.com/bucket/models/..."
                  size="small"
                />
                <TextFieldElement
                  name="checkpoints.0.modelPath"
                  label="Model Path (S3 URL)"
                  autoComplete="off"
                  fullWidth
                  required
                  placeholder="https://s3.amazonaws.com/bucket/models/..."
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextFieldElement
                  name="checkpoints.0.adjacentAudio"
                  label="Adjacent Audio (S3 URL)"
                  fullWidth
                  placeholder="https://s3.amazonaws.com/bucket/models/..."
                  autoComplete="off"
                />
                <SelectElement
                  name="checkpoints.0.sampleRate"
                  label="Sample Rate"
                  options={sampleRateOptions}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Box>

          {/* Additional Languages Note */}
          <Box
            sx={{
              backgroundColor: "action.hover",
              borderRadius: 1,
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Additional language checkpoints can be added after the model is
              created
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
