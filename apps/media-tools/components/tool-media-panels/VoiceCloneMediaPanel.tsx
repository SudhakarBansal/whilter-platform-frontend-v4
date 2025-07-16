'use client';
import type { UploadedFile } from "@/types";
import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";
import { SelectElement, TextareaAutosizeElement, useFormContext } from "@whilter/forms";
import { Button } from "@mui/material";

export function VoiceCloneMediaPanel() {
    const { setValue } = useFormContext();

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

    // Handle file upload and set it in the form
    function handleUpload(uploadedFile: UploadedFile) {
        console.log("File uploaded successfully:", uploadedFile);
        // Convert URL to file or store URL in form
        setValue('sourceAudio', uploadedFile.url);
    }

    function handleFileSelected(file: File) {
        console.log("File selected:", file);
        setValue('sourceAudio', file);
    }

    function handleFileRemoved(removedFile: UploadedFile) {
        console.log("File removed:", removedFile);
        setValue('sourceAudio', undefined);
    }

    return (
        <div className="flex flex-col gap-6">
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

            <TextareaAutosizeElement
                placeholder="Enter your text here"
                name="textContent"
            />

            <div className="flex flex-col sm:flex-row gap-x-5">
                <SelectElement
                    name="selectOption1"
                    label="Select Option 1"
                    options={options}
                    fullWidth
                />
                <SelectElement
                    name="selectOption2"
                    label="Select Option 2"
                    options={options}
                    fullWidth
                />
            </div>

            <Button
                variant="generateButton"
                sx={{ mt: 2, padding: 2 }}
                fullWidth
                className="text-xl"
                type="submit"
            >
                Generate Speech
            </Button>
        </div>
    );
}