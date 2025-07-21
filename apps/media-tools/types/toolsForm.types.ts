export interface BaseDefaults {
    projectName: string;
}

export interface VoiceCloneFormValues extends BaseDefaults {
    // From VoiceCloneControls
    audioLengthMs: number;
    keepSilenceDurationMs: number;
    silenceLengthMs: number;
    speed: string;
    pitch: number;
    speechRate: string;

    // From VoiceCloneMediaPanel
    modalName: string;
    language: string;
    sourceAudio: string;
    textContent: string;
    tags: string[];
}