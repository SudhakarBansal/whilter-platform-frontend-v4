// File: lib/getToolDefaultValues.ts
import type { VoiceCloneFormValues } from "@/types";

export function getToolDefaultValues(toolSlug: string): VoiceCloneFormValues {
    switch (toolSlug) {
        case "voice-cloning":
            return {
                projectName: '',
                speaker: 'default',
                speakingRate: 1.0,
                samplingRate: '',
                pitch: 0,
                outputFormat: 'wav',
                customWidth: 1920,
                customHeight: 1080,
                postProcessing: true,
                modalSelection: '',
                textContent: '',
                selectOption1: '',
                selectOption2: '',
            };

        case "text-to-speech":
            return {
                projectName: 'TTS Project',
                speaker: 'female1',
                speakingRate: 1.2,
                samplingRate: '44100',
                pitch: 2,
                outputFormat: 'mp3',
                customWidth: 1280,
                customHeight: 720,
                postProcessing: false,
                modalSelection: 'two',
                textContent: 'Hello, this is a test.',
                selectOption1: 'one',
                selectOption2: 'two',
            };

        // Add more tools here...

        default:
            return {
                projectName: '',
                speaker: 'default',
                speakingRate: 1.0,
                samplingRate: '',
                pitch: 9,
                outputFormat: 'wav',
                customWidth: 1900,
                customHeight: 1080,
                postProcessing: true,
                modalSelection: '',
                textContent: '',
                selectOption1: '',
                selectOption2: '',
            };
    }
}
