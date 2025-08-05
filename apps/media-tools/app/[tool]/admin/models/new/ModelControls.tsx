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
    Slider,
    FormControlLabel,
    Switch,
} from '@mui/material';
import {
    ExpandMore,
    Save,
    Preview,
} from '@mui/icons-material';
import {
    TextFieldElement,
    SwitchElement
} from '@whilter/forms';
import { useFormContext, useWatch } from 'react-hook-form';

export const ModelControls = () => {
    const { setValue, getValues } = useFormContext();
    const watchedValues = useWatch();

    // Determine which fields to show based on language or model type
    const showSpeedControl = true; // Show for most models
    const showSpeechRateControl = true; // Show for TTS models
    const showPitchControl = true; // Show for voice models

    const handleSliderChange = (field: string, value: number) => {
        setValue(`defaultConfigurations.${field}`, value);
    };

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Default Configurations
                </Typography>
                <Typography variant="caption">
                    Set default parameters for this voice model
                </Typography>
            </Box>

            {/* Audio Length */}
            <Box>
                <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
                    Audio Length (ms)
                </Typography>
                <TextFieldElement
                    name="defaultConfigurations.audioLengthMs"
                    type="number"
                    fullWidth
                    size="small"
                />
            </Box>

            {/* Silence Controls */}
            <Box>
                <Typography variant="subtitle2" sx={{ color: 'white', mb: 2 }}>
                    Silence Configuration
                </Typography>
                <Stack spacing={2}>
                    <TextFieldElement
                        name="defaultConfigurations.keepSilenceDurationMs"
                        label="Keep Silence Duration (ms)"
                        type="number"
                        fullWidth
                        size="small"
                    />
                    <TextFieldElement
                        name="defaultConfigurations.silenceLengthMs"
                        label="Silence Length (ms)"
                        type="number"
                        fullWidth
                        size="small"
                    />
                </Stack>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

            {/* Voice Parameters */}
            <Accordion
                defaultExpanded
                sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '&:before': { display: 'none' }
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                    sx={{ color: 'white' }}
                >
                    <Typography variant="subtitle2">Voice Parameters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={3}>
                        {/* Speed Control */}
                        {showSpeedControl && (
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Speed: {watchedValues?.defaultConfigurations?.speed || 1.0}x
                                </Typography>
                                <Slider
                                    value={watchedValues?.defaultConfigurations?.speed || 1.0}
                                    onChange={(_, value) => handleSliderChange('speed', value as number)}
                                    min={0.5}
                                    max={2.0}
                                    step={0.1}
                                    sx={{
                                        color: 'white',
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: 'white',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: 'white',
                                        },
                                        '& .MuiSlider-rail': {
                                            backgroundColor: 'rgba(255,255,255,0.3)',
                                        },
                                    }}
                                />
                            </Box>
                        )}

                        {/* Speech Rate Control */}
                        {showSpeechRateControl && (
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Speech Rate: {watchedValues?.defaultConfigurations?.speechRate || 1.0}x
                                </Typography>
                                <Slider
                                    value={watchedValues?.defaultConfigurations?.speechRate || 1.0}
                                    onChange={(_, value) => handleSliderChange('speechRate', value as number)}
                                    min={0.5}
                                    max={2.0}
                                    step={0.1}
                                    sx={{
                                        color: 'white',
                                        '& .MuiSlider-thumb': { backgroundColor: 'white' },
                                        '& .MuiSlider-track': { backgroundColor: 'white' },
                                        '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.3)' },
                                    }}
                                />
                            </Box>
                        )}

                        {/* Pitch Control */}
                        {showPitchControl && (
                            <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                    Pitch: {watchedValues?.defaultConfigurations?.pitch || 1.0}x
                                </Typography>
                                <Slider
                                    value={watchedValues?.defaultConfigurations?.pitch || 1.0}
                                    onChange={(_, value) => handleSliderChange('pitch', value as number)}
                                    min={0.5}
                                    max={2.0}
                                    step={0.1}
                                    sx={{
                                        color: 'white',
                                        '& .MuiSlider-thumb': { backgroundColor: 'white' },
                                        '& .MuiSlider-track': { backgroundColor: 'white' },
                                        '& .MuiSlider-rail': { backgroundColor: 'rgba(255,255,255,0.3)' },
                                    }}
                                />
                            </Box>
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {/* Action Buttons */}
            <Box sx={{ mt: 'auto', pt: 2 }}>
                <Button
                    fullWidth
                    variant="flatSecondary"
                    type="submit"
                    size="large"
                    startIcon={<Save />}
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                        }
                    }}
                >
                    Create Model
                </Button>

                <Button
                    fullWidth
                    variant="outlinePrimary"
                    size="small"
                    startIcon={<Preview />}
                    sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }
                    }}
                >
                    Test Configuration
                </Button>
            </Box>
        </Stack>
    );
};