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
  SwitchElement
} from '@whilter/forms';

export const LipSyncControls = () => {
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
    <Stack spacing={3}>
      {/* Project Header */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          {/* <Typography variant="h6">
              Projects Name
            </Typography> */}
        </Stack>

        <TextFieldElement
          name="projectName"
          fullWidth
          variant="outlined"
          placeholder="Name your project"
          size="small"
          autoComplete='off'
          label="Project Name"
          required
        />
      </Box>

      {/* Speaker Selection */}
      <Box>
        {/* <Typography variant="h6" mb={1}>
            Speaker
          </Typography> */}
        <SelectElement
          name="speaker"
          options={speakerOptions}
          fullWidth
          size="small"
          label="Select Speaker"
        />
      </Box>

      {/* Speaking Rate */}
      <Box>
        {/* <Typography variant="h6" mb={1}>
            Speaking Rate
          </Typography> */}
        <SelectElement
          name="speakingRate"
          options={speakingRateOptions}
          fullWidth
          size="small"
          label="Speaking Rate"
        />
      </Box>

      {/* Sampling Rate */}
      <Box>
        {/* <Typography variant="h6" mb={1}>
            Sampling Rate
          </Typography> */}
        <SelectElement
          name="samplingRate"
          options={samplingRateOptions}
          fullWidth
          size="small"
          label="Sampling Rate"
        />
      </Box>

      {/* Output Format */}
      <Box>
        {/* <Typography variant="h6" mb={1}>
            Output Format
          </Typography> */}
        <SelectElement
          name="outputFormat"
          options={formatOptions}
          fullWidth
          size="small"
          label="Output Format"
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
            label="W"
            type="number"
            size="small"
            sx={{ flex: 1 }}
          />
          <TextFieldElement
            name="customHeight"
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
              label="Enable Post Processing"
            />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Additional processing options will appear here based on the selected tool.
              </Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Action Buttons */}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Button
          fullWidth
          variant="flatPrimary"
          // type="submit"
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
  );
};
