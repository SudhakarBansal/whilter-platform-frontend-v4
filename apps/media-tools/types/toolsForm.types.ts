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
    modalSelection: string;
    sourceAudio?: File;
    textContent: string;
    selectOption1: string;
    selectOption2: string;
}