import type { UploadedFile } from "@/types";
import FileUploadWrapper from "@/components/file-upload/FileUploadWrapper";
import { SelectElement, TextareaAutosizeElement, useFormContext } from "@whilter/forms";
import { Button } from "@mui/material";
import type { VoiceCloneFormValues } from "@/types";
import { TagsInput } from "@/components/TagsInput";

export function VoiceCloneMediaPanel() {
    const { setValue } = useFormContext<VoiceCloneFormValues>();

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
            <div className="flex flex-col sm:flex-row gap-x-5">
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
            </div>
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

            <TagsInput
                name="tags"
                label="Tags"
            />

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