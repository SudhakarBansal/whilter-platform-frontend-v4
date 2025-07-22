import type { UploadedFile } from "@/types";
import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";
import { SelectElement, TextareaAutosizeElement, useFormContext, useWatch } from "@whilter/forms";
import { Button, Typography, Box } from "@mui/material";
import type { VoiceCloneFormInitialValues } from "@/types";
import { TagsInput } from "@/components/TagsInput";
import { useEffect } from "react";
import { MAX_CHARACTERS_IN_TEXT_INPUT } from "@/constants";

export function VoiceCloneMediaPanel() {
    const { setValue } = useFormContext<VoiceCloneFormInitialValues>();

    // Watch the inputOption field to conditionally render components
    const inputOption = useWatch({ name: 'inputOption' });
    // Watch the textContent field to show word/character count
    const textContent = useWatch({ name: 'textContent' }) || '';

    useEffect(() => {
        if (inputOption === 'text') {
            // Clear audio-related fields when switching to text
            setValue('sourceAudio', '');
            setValue('recordedAudio', '');
        } else if (inputOption === 'audioFile') {
            // Clear text and recorded audio when switching to audio file
            setValue('textContent', '');
            setValue('recordedAudio', '');
        } else if (inputOption === 'recordAudio') {
            // Clear text and source audio when switching to record audio
            setValue('textContent', '');
            setValue('sourceAudio', '');
        }
    }, [inputOption, setValue]);

    // Calculate word count and character count
    const characterCount = textContent.length;
    const maxCharacters = MAX_CHARACTERS_IN_TEXT_INPUT;
    const isOverLimit = characterCount > maxCharacters;

    const options = [{
        id: 'one',
        label: 'One'
    }, {
        id: 'two',
        label: 'Two'
    }, {
        id: 'three',
        label: 'Three'
    }];

    const InputOptions = [{
        id: 'text',
        label: 'Text Input'
    }, {
        id: 'audioFile',
        label: 'Audio File Upload'
    },
        // {
        //     id: 'recordAudio',
        //     label: 'Record Audio'
        // }
    ];

    // Handle file upload - this is called after successful S3 upload
    function handleUpload(uploadedFile: UploadedFile) {
        console.log("File uploaded successfully:", uploadedFile);
        // Set the S3 file path/URL as sourceAudio
        setValue('sourceAudio', uploadedFile.url);
    }

    // Handle file selection - this is called when file is selected but not yet uploaded
    function handleFileSelected(file: File) {
        console.log("File selected:", file);
        // Clear the sourceAudio field when a new file is selected but not uploaded yet
        setValue('sourceAudio', '');
    }

    // Handle file removal
    function handleFileRemoved(removedFile: UploadedFile) {
        console.log("File removed:", removedFile);
        // Clear the sourceAudio field when file is removed
        setValue('sourceAudio', '');
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-y-5 sm:flex-row sm:gap-x-5">
                <SelectElement
                    name="modalName"
                    label="Select Modal"
                    options={options}
                    fullWidth
                />
                <SelectElement
                    name="language"
                    label="Select Language"
                    options={options}
                    fullWidth
                />

                <SelectElement
                    name="inputOption"
                    label="Select Input type"
                    options={InputOptions}
                    fullWidth
                />
            </div>

            {/* Conditional Content Based on Input Option */}
            {inputOption === 'text' && (
                <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    background: "#FFFFFF",
                    '&:hover': {
                        borderColor: 'primary.main',
                    }
                }}
                >
                    <Typography
                        variant="subtitle1"
                        marginBottom={2}
                        className="text-black"
                    >
                        Add Text
                    </Typography>
                    <TextareaAutosizeElement
                        placeholder="Start typing here or paste any text you want to turn into speech..."
                        name="textContent"
                        variant="filled"
                        minRows={4}
                        sx={{
                            border: '2px dashed',
                            borderColor: isOverLimit ? 'error.main' : '#e0e0e0',
                        }}
                    />

                    {/* Character Limit Display */}

                    <Typography
                        variant="body2"
                        color={isOverLimit ? 'error.main' : 'text.secondary'}
                        sx={{ fontWeight: isOverLimit ? 'medium' : 'normal', mt: 1 }}
                    >
                        {characterCount.toLocaleString()}/{maxCharacters.toLocaleString()} characters
                    </Typography>

                    {/* Character Limit Disclaimer */}
                    <Typography
                        variant="caption"
                        color={isOverLimit ? 'error.main' : 'text.secondary'}
                        sx={{
                            mt: 0.5,
                            display: 'block',
                            fontStyle: 'italic'
                        }}
                    >
                        {isOverLimit
                            ? `Text exceeds the ${maxCharacters.toLocaleString()} character limit. Please reduce the length.`
                            : `Maximum ${maxCharacters.toLocaleString()} characters allowed.`
                        }
                    </Typography>
                </Box>
            )}

            {inputOption === 'audioFile' && (
                <FileUploadWrapper
                    type="audio"
                    label="Source Audio"
                    heading="Upload Source Audio"
                    subheading="Add your Files here"
                    footer="Only support .wav, mp3 and Audio files"
                    acceptedFormats={['.wav', '.mp3', '.m4a']}
                    maxFileSize={10}
                    onUpload={handleUpload}
                    onFileSelected={handleFileSelected}
                    onFileRemoved={handleFileRemoved}
                />
            )}

            {/* Tags Section */}
            <Box>
                <Typography variant="h6" marginBottom={1}>
                    Add Tags
                </Typography>
                <TagsInput
                    name="tags"
                    label="Add tags to organize your speech files"
                />
            </Box>

            <Button
                variant="generateButton"
                sx={{ mt: 2, padding: 2 }}
                fullWidth
                className="text-xl"
                type="submit"
                disabled={isOverLimit}
            >
                Generate Speech
            </Button>
        </div>
    );
}