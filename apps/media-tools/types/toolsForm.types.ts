export interface BaseDefaults {
    projectName: string;
}

export interface VoiceCloneFormValues extends BaseDefaults {
    // From VoiceCloneControls
    speaker: string;
    speakingRate: number;
    samplingRate: string;
    pitch: number;
    outputFormat: string;
    customWidth: number;
    customHeight: number;
    postProcessing: boolean;

    // From VoiceCloneMediaPanel
    modalName: string;
    language: string;
    modalSelection: string;
    sourceAudio?: File;
    textContent: string;
    tags: string[];
}