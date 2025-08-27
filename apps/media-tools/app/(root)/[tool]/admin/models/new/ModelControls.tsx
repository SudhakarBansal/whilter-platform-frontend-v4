import React from "react";
import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import { SliderElement, SwitchElement } from "@whilter/forms";

export const ModelControls = () => {
  return (
    <Stack spacing={4} px={1}>
      {/* Header */}
      <Box>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Model Configuration
        </Typography>
        <Typography variant="body2" >
          Set parameters and switches for this voice model
        </Typography>
      </Box>

      {/* Configuration Switches */}
      <Box>
        <Typography variant="subtitle2" marginBottom={2}>
          Processing Options
        </Typography>
        <Stack spacing={1}>
          <SwitchElement label="Update speed" name="is_update_speed" />

          <SwitchElement name="is_update_loudness" label="Update Loudness" />
          <SwitchElement
            name="is_update_transition"
            label="Update Transition"
          />
          <SwitchElement name="is_transcribe" label="Enable Transcription" />
          <SwitchElement
            name="is_update_audio_length"
            label="Update Audio Length"
          />
          <SwitchElement name="is_trim_silence" label="Trim Silence" />
          <SwitchElement name="is_use_index_file" label="Use Index File" />
          <SwitchElement
            name="is_add_constant_silence"
            label="Add Constant Silence"
          />
        </Stack>
      </Box>

      <Divider />

      <Typography variant="subtitle2">Voice Parameters</Typography>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            Speed
          </Typography>
        </Box>
        <SliderElement
          name="speed"
          size="small"
          min={0.1}
          max={3.0}
          step={0.1}
          marks={[
            { value: 0.1, label: "0.1x" },
            { value: 3.0, label: "3x" },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}x`}
        />
      </Box>

      {/* Speech Rate Control */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            Speech Rate
          </Typography>
        </Box>
        <SliderElement
          name="speech_rate"
          size="small"
          min={0.1}
          max={3.0}
          step={0.1}
          marks={[
            { value: 0.1, label: "Slow" },
            { value: 3.0, label: "Max" },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}x`}
        />
      </Box>

      {/* Pitch Control */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" color="text.primary">
            Pitch
          </Typography>
        </Box>
        <SliderElement
          name="pitch"
          size="small"
          min={0.1}
          max={5.0}
          step={0.1}
          marks={[
            { value: 0.1, label: "Low" },
            { value: 5.0, label: "Max" },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}x`}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: "auto", pt: 2 }}>
        <Button
          fullWidth
          variant="primary"
          type="submit"
          size="large"
          startIcon={<Save />}
        >
          Create Model
        </Button>
      </Box>
    </Stack>
  );
};