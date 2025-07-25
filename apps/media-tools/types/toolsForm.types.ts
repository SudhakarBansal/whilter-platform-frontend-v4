export interface BaseDefaults {
    projectName: string;
}

// Common fields shared across all input types
interface VoiceCloneBaseFields extends BaseDefaults {
    // From VoiceCloneControls
    audioLengthMs: number;
    keepSilenceDurationMs: number;
    silenceLengthMs: number;
    speed: number;
    pitch: number;
    speechRate: number;

    // Common fields from VoiceCloneMediaPanel
    modalName: string;
    language: string;
    tags: string[];
}

// Discriminated union for different input types
export type VoiceCloneFormValues = VoiceCloneBaseFields & (
    | {
        inputOption: 'text';
        textContent: string;
        sourceAudio?: never; // This field shouldn't exist for text input
        recordedAudio?: never; // This field shouldn't exist for text input
    }
    | {
        inputOption: 'audioFile';
        sourceAudio: string;
        textContent?: never; // This field shouldn't exist for audio file input
        recordedAudio?: never; // This field shouldn't exist for audio file input
    }
    | {
        inputOption: 'recordAudio';
        recordedAudio: string;
        textContent?: never; // This field shouldn't exist for record audio input
        sourceAudio?: never; // This field shouldn't exist for record audio input
    }
);

// Helper type for form initialization (includes all possible fields)
export interface VoiceCloneFormInitialValues extends VoiceCloneBaseFields {
    inputOption: 'text' | 'audioFile' | 'recordAudio';
    textContent: string;
    sourceAudio: string;
    recordedAudio: string;
}