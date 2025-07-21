export interface BaseDefaults {
    projectName: string;
}

export interface VoiceCloneFormValues extends BaseDefaults {
    // From VoiceCloneControls
    audioLengthMs: number;
    keepSilenceDurationMs: number;
    silenceLengthMs: number;
    speed: number;
    pitch: number;
    speechRate: number;

    // From VoiceCloneMediaPanel
    modalName: string;
    language: string;
    sourceAudio: string;
    textContent: string;
    tags: string[];
}