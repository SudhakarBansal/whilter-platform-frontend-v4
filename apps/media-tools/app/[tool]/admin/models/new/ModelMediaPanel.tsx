import React from "react";
import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import {
  TextFieldElement,
  SelectElement,
  useFormContext,
  useFieldArray,
} from "@whilter/forms";
import type { UploadedFile } from "@/types";

export function ModelMediaPanel() {
  const { setValue, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "language_checkpoints",
  });

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
    { id: "16000", label: "16kHz" },
    { id: "22050", label: "22.05kHz" },
    { id: "44100", label: "44.1kHz" },
    { id: "48000", label: "48kHz" },
  ];

  // Handle file upload - this is called after successful S3 upload
  function handleUpload(uploadedFile: UploadedFile, index: Number) {
    console.log("File uploaded successfully:", uploadedFile);
    // Set the S3 file path/URL as reference_audio
    setValue(`language_checkpoints.${index}.reference_audio`, uploadedFile.url);
  }

  // Handle file selection - this is called when file is selected but not yet uploaded
  function handleFileSelected(file: UploadedFile, index: Number) {
    console.log("File selected:", file);
    // Clear the reference_audio field when a new file is selected but not uploaded yet
    setValue(`language_checkpoints.${index}.reference_audio`, "");
  }

  // Handle file removal
  function handleFileRemoved(removedFile: UploadedFile, index: Number) {
    console.log("File removed:", removedFile);
    // Clear the reference_audio field when file is removed
    setValue(`language_checkpoints.${index}.reference_audio`, "");
  }

  // Add new checkpoint
  function addCheckpoint() {
    append({
      language: "English",
      reference_audio: "",
      reference_audio_text: "",
      adjacent_audio: "",
      index_path: "",
      sample_rate: "44100",
      model_path: "",
      required_audio_length: 4000,
      keep_silence: 300,
      silence_length: 500,
      transcribe_language: "English",
    });
  }

  // Remove checkpoint
  function removeCheckpoint(index: number) {
    if (fields.length > 1) {
      remove(index);
    }
  }

  return (
    <Stack spacing={4}>
      {/* Speaker Name */}
      <Box className="bg-transparent">
        <TextFieldElement
          name="speaker_name"
          label="Speaker Name"
          type="text"
          fullWidth
          required
          autoComplete="off"
          placeholder="e.g., Aditya"
          helperText="Enter a unique name for this speaker"
          size="small"
        />
      </Box>

      {/* Language Checkpoints */}
      <Card className="bg-transparent">
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">
              Language Checkpoints ({fields.length})
            </Typography>
            <Button
              variant="outlinePrimary"
              startIcon={<Add />}
              onClick={addCheckpoint}
              size="small"
            >
              Add Checkpoint
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Configure model checkpoints for different languages
          </Typography>

          {/* Checkpoints List */}
          <Stack spacing={3}>
            {fields.map((checkpoint, index) => (
              <Box
                key={checkpoint.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                  position: "relative",
                }}
              >
                <Stack spacing={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Checkpoint {index + 1}
                      </Typography>
                      {index === 0 && (
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
                          PRIMARY
                        </Typography>
                      )}
                    </Box>
                    {fields.length > 1 && (
                      <IconButton
                        onClick={() => removeCheckpoint(index)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <SelectElement
                      name={`language_checkpoints.${index}.language`}
                      label="Language"
                      options={languageOptions}
                      fullWidth
                      required
                    />
                    <SelectElement
                      name={`language_checkpoints.${index}.transcribe_language`}
                      label="Transcribe Language"
                      options={languageOptions}
                      fullWidth
                      required
                    />
                  </Stack>

                  {/* Reference Audio Upload for each checkpoint */}
                  <FileUploadWrapper
                    type="audio"
                    label="Reference Audio"
                    heading="Upload Reference Audio for this Language"
                    subheading="Upload audio sample for this language checkpoint"
                    footer="Supports .wav, .mp3, .flac formats. Max size: 50MB"
                    acceptedFormats={[".wav", ".mp3", ".flac"]}
                    maxFileSize={50}
                    name={`language_checkpoints.${index}.reference_audio`}
                    onUpload={(file) => handleUpload(file, index)}
                    onFileSelected={(file) => handleFileSelected(file, index)}
                    onFileRemoved={(file) => handleFileRemoved(file, index)}
                  />

                  <TextFieldElement
                    name={`language_checkpoints.${index}.reference_audio_text`}
                    label="Reference Audio Text"
                    fullWidth
                    multiline
                    rows={3}
                    required
                    placeholder="Enter reference text in the selected language"
                  />

                  <TextFieldElement
                    name={`language_checkpoints.${index}.adjacent_audio`}
                    label="Adjacent Audio"
                    fullWidth
                    autoComplete="off"
                    placeholder="Adjacent audio reference"
                    size="small"
                  />

                  <Stack direction="row" spacing={2}>
                    <TextFieldElement
                      name={`language_checkpoints.${index}.index_path`}
                      label="Index Path"
                      fullWidth
                      required
                      autoComplete="off"
                      placeholder="Path to index file"
                      size="small"
                    />
                    <TextFieldElement
                      name={`language_checkpoints.${index}.model_path`}
                      label="Model Path"
                      autoComplete="off"
                      fullWidth
                      required
                      placeholder="Path to model file"
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <SelectElement
                      name={`language_checkpoints.${index}.sample_rate`}
                      label="Sample Rate"
                      options={sampleRateOptions}
                      fullWidth
                    />
                    <TextFieldElement
                      name={`language_checkpoints.${index}.required_audio_length`}
                      label="Required Audio Length (ms)"
                      type="number"
                      fullWidth
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <TextFieldElement
                      name={`language_checkpoints.${index}.keep_silence`}
                      label="Keep Silence (ms)"
                      type="number"
                      fullWidth
                      size="small"
                    />
                    <TextFieldElement
                      name={`language_checkpoints.${index}.silence_length`}
                      label="Silence Length (ms)"
                      type="number"
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
