// File: lib/getToolDefaultValues.ts
import type { BaseDefaults, VoiceCloneFormValues } from "@/types";

export function getToolDefaultValues(toolSlug: string): VoiceCloneFormValues | BaseDefaults {
    switch (toolSlug) {
        case "voice-cloning":
            return {
                projectName: '',
                modalName :'',
                language: '',
                speakingRate: 1.0,
                samplingRate: '',
                pitch: 0,
                outputFormat: 'wav',
                customWidth: 1920,
                customHeight: 1080,
                postProcessing: true,
                modalSelection: '',
                textContent: '',
            };

        case "text-to-speech":
            return {
                projectName: 'TTS Project',
            };

        // Add more tools here...

        default:
            return {
                projectName: '',
            };
    }
}
