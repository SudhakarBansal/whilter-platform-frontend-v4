import type { BaseDefaults, VoiceCloneFormInitialValues } from "@/types";

export function getToolDefaultValues(toolSlug: string): VoiceCloneFormInitialValues | BaseDefaults {
    switch (toolSlug) {
        case "voice-cloning":
            return {
                inputOption: 'text',
                projectName: '',
                audioLengthMs: 3000,
                keepSilenceDurationMs: 0,
                silenceLengthMs: 100,
                speed: 0.1,
                pitch: 0.1,
                speechRate: 0.1,
                modalName: '',
                language: '',
                sourceAudio: '',
                recordedAudio: '',
                textContent: '',
                tags: []
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
