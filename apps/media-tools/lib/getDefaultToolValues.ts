import type { BaseDefaults, VoiceCloneFormInitialValues } from "@/types";

export function getToolDefaultValues(toolSlug: string): VoiceCloneFormInitialValues | BaseDefaults {
    switch (toolSlug) {
        case "voice-cloning":
            return {
                inputOption: 'text',
                projectName: '',
                audioLengthMs: 0,
                keepSilenceDurationMs: 0,
                silenceLengthMs: 0,
                speed: 0,
                pitch: 0,
                speechRate: 0,
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
