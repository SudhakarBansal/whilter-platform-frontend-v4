import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Paper,
    Divider,
    Tooltip,
    IconButton,
} from '@mui/material';
import {
    TextFieldElement,
    SliderElement
} from '@whilter/forms';
import {
    Info,
} from '@mui/icons-material';

export const VoiceCloneControls = () => {
    return (
        <Stack spacing={4} px={2}>
            {/* Header Section */}
            <Box>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    Settings
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                    Configure your parameters for optimal results
                </Typography>
            </Box>

            {/* Project Configuration */}
            <Box>
                <TextFieldElement
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter a descriptive project name"
                    size="small"
                    autoComplete="off"
                    label="Project Name"
                    required
                    helperText="Choose a meaningful name to identify this voice clone project"
                />
            </Box>

            <Divider />

            {/* Audio Configuration */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Audio Length
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Total duration of the audio sample:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>3-10s:</strong> Quick testing, minimal processing</li>
                                <li><strong>10-30s:</strong> Balanced quality and processing time</li>
                                <li><strong>30-50s:</strong> Highest quality, requires more processing</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="audioLengthMs"
                    size="small"
                    min={3000}
                    max={50000}
                    step={1000}
                    marks={[
                        { value: 3000, label: '3s' },
                        { value: 50000, label: '50s' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value / 1000).toFixed(1)}s`}
                />
            </Box>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Keep Silence Duration
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Amount of silence to preserve:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>0ms:</strong> Remove all silence (aggressive trimming)</li>
                                <li><strong>500-1500ms:</strong> Natural pauses in speech</li>
                                <li><strong>1500-3000ms:</strong> Longer pauses for dramatic effect</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="keepSilenceDurationMs"
                    size="small"
                    min={0}
                    max={3000}
                    step={100}
                    marks={[
                        { value: 0, label: '0ms' },
                        { value: 3000, label: '3s' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}ms`}
                />
            </Box>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Silence Length
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Duration of silence gaps between words:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>100-500ms:</strong> Tight spacing for fast-paced speech</li>
                                <li><strong>500-1500ms:</strong> Natural conversational pauses</li>
                                <li><strong>1500-5000ms:</strong> Longer breaks for dramatic effect</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="silenceLengthMs"
                    size="small"
                    min={100}
                    max={5000}
                    step={100}
                    marks={[
                        { value: 100, label: '0.1s' },
                        { value: 5000, label: '5s' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${(value / 1000).toFixed(1)}s`}
                />
            </Box>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Playback Speed
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Playback speed multiplier:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>0.1-0.5x:</strong> Very slow (detailed analysis)</li>
                                <li><strong>0.5-1.0x:</strong> Slowed down speech</li>
                                <li><strong>1.0x:</strong> Normal speed</li>
                                <li><strong>1.0-2.0x:</strong> Sped up speech</li>
                                <li><strong>2.0-3.0x:</strong> Very fast (time compression)</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="speed"
                    size="small"
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    marks={[
                        { value: 0.1, label: '0.1x' },
                        { value: 3.0, label: '3x' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}x`}
                />
            </Box>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Speech Rate
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Natural speaking rate:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>0.1-0.5x:</strong> Very slow, exaggerated pronunciation</li>
                                <li><strong>0.5-1.0x:</strong> Slow to normal speech</li>
                                <li><strong>1.0-2.0x:</strong> Fast speech while maintaining clarity</li>
                                <li><strong>2.0-3.0x:</strong> Very fast, may reduce clarity</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="speechRate"
                    size="small"
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    marks={[
                        { value: 0.1, label: 'Slow' },
                        { value: 3.0, label: 'Max' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}x`}
                />
            </Box>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.primary">
                        Pitch
                    </Typography>
                    <Tooltip title={
                        <>
                            <div>Voice pitch level:</div>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li><strong>0.1-1.0x:</strong> Very deep, robotic voice</li>
                                <li><strong>1.0-1.5x:</strong> Natural male voice range</li>
                                <li><strong>1.5-2.5x:</strong> Natural female voice range</li>
                                <li><strong>2.5-5.0x:</strong> Very high-pitched, cartoonish</li>
                            </ul>
                        </>
                    }>
                        <IconButton size="small" sx={{ color: 'text.primary' }}>
                            <Info fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <SliderElement
                    name="pitch"
                    size="small"
                    min={0.1}
                    max={5.0}
                    step={0.1}
                    marks={[
                        { value: 0.1, label: 'Low' },
                        { value: 5.0, label: 'Max' }
                    ]}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}x`}
                />
            </Box>
        </Stack>
    );
};