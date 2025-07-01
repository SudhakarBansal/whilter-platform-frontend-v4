'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Download,
} from '@mui/icons-material';
import { 
  SelectElement, 
  TextFieldElement,
  SwitchElement,
  useForm,
  useWatch,
  FormContainer
} from '@whilter/forms';

interface LipSyncSettings {
  projectName: string;
  speaker: string;
  speakingRate: number;
  samplingRate: string;
  pitch: number;
  outputFormat: string;
  customWidth: number;
  customHeight: number;
  postProcessing: boolean;
}

interface LipSyncControlsProps {
  onSettingsChange?: (settings: LipSyncSettings) => void;
}

export const LipSyncControls: React.FC<LipSyncControlsProps> = ({
  onSettingsChange,
}) => {
  const { control } = useForm<LipSyncSettings>({
    defaultValues: {
      projectName: '',
      speaker: 'default',
      speakingRate: 1.0,
      samplingRate: '22050',
      pitch: 0,
      outputFormat: 'wav',
      customWidth: 1920,
      customHeight: 1080,
      postProcessing: true,
    }
  });

  // Watch all form values
  const formValues = useWatch({ control });
  console.log('Form values:', formValues);

  const speakerOptions = [
    { id: 'default', label: 'Default Voice' },
    { id: 'female1', label: 'Female Voice 1' },
    { id: 'male1', label: 'Male Voice 1' },
    { id: 'child', label: 'Child Voice' },
    { id: 'robotic', label: 'Robotic Voice' },
  ];

  const speakingRateOptions = [
    { id: 0.5, label: '0.5x' },
    { id: 0.75, label: '0.75x' },
    { id: 1.0, label: '1.0x (Normal)' },
    { id: 1.25, label: '1.25x' },
    { id: 1.5, label: '1.5x' },
    { id: 2.0, label: '2.0x' },
  ];

  const samplingRateOptions = [
    { id: '16000', label: '16kHz' },
    { id: '22050', label: '22.05kHz' },
    { id: '44100', label: '44.1kHz' },
    { id: '48000', label: '48kHz' },
  ];

  const formatOptions = [
    { id: 'wav', label: 'WAV' },
    { id: 'mp3', label: 'MP3' },
    { id: 'flac', label: 'FLAC' },
    { id: 'ogg', label: 'OGG' },
  ];

  return (
    <FormContainer<LipSyncSettings>
      onSuccess={(data) => {
        console.log('Form submitted:', data);
        onSettingsChange?.(data);
      }}
    >
      <Stack spacing={3}>
        {/* Project Header */}
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="h6">
              Projects Name
            </Typography>
          </Stack>
          
          <TextFieldElement
            name="projectName"
            control={control}
            fullWidth
            variant="outlined"
            placeholder="Name your project"
            size="small"
            autoComplete='off'
            required
          />
        </Box>

        <Divider />

        {/* Speaker Selection */}
        <Box>
          <Typography variant="h6" mb={1}>
            Speaker
          </Typography>
          <SelectElement
            name="speaker"
            control={control}
            options={speakerOptions}
            fullWidth
            size="small"
          />
        </Box>

        {/* Speaking Rate */}
        <Box>
          <Typography variant="h6" mb={1}>
            Speaking Rate
          </Typography>
          <SelectElement
            name="speakingRate"
            control={control}
            options={speakingRateOptions}
            fullWidth
            size="small"
          />
        </Box>

        {/* Sampling Rate */}
        <Box>
          <Typography variant="h6" mb={1}>
            Sampling Rate
          </Typography>
          <SelectElement
            name="samplingRate"
            control={control}
            options={samplingRateOptions}
            fullWidth
            size="small"
          />
        </Box>

        {/* Output Format */}
        <Box>
          <Typography variant="h6" mb={1}>
            Output Format
          </Typography>
          <SelectElement
            name="outputFormat"
            control={control}
            options={formatOptions}
            fullWidth
            size="small"
          />
        </Box>

        {/* Custom Dimensions */}
        <Box>
          <Typography variant="h6" mb={2}>
            Custom Dimensions
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextFieldElement
              name="customWidth"
              control={control}
              label="W"
              type="number"
              size="small"
              sx={{ flex: 1 }}
            />
            <TextFieldElement
              name="customHeight"
              control={control}
              label="H"
              type="number"
              size="small"
              sx={{ flex: 1 }}
            />
          </Stack>
        </Box>

        <Divider />

        {/* Post Processing */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2">Post Processing</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <SwitchElement
                name="postProcessing"
                control={control}
                label="Enable Post Processing"
              />
              
              {formValues?.postProcessing && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Additional processing options will appear here based on the selected tool.
                  </Typography>
                </Box>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Action Buttons */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            fullWidth
            variant="flatPrimary"
            type="submit"
            size="large"
            sx={{ mb: 1, borderRadius: 2 }}
          >
            Apply Changes
          </Button>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlinePrimary"
              size="small"
              startIcon={<PlayArrow />}
              sx={{ flex: 1 }}
            >
              Preview
            </Button>
            <Button
              variant="outlineSecondary"
              size="small"
              startIcon={<Download />}
              sx={{ flex: 1 }}
            >
              Export
            </Button>
          </Stack>
        </Box>
      </Stack>
    </FormContainer>
  );
};