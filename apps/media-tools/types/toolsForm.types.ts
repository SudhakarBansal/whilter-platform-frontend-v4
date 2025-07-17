export interface VoiceCloneFormValues {
    // From VoiceCloneControls
    projectName: string;
    speaker: string;
    speakingRate: number;
    samplingRate: string;
    pitch: number;
    outputFormat: string;
    customWidth: number;
    customHeight: number;
    postProcessing: boolean;

    // From VoiceCloneHeader
    modalSelection: string;

    // From VoiceCloneMediaPanel
    sourceAudio?: File;
    textContent: string;
    selectOption1: string;
    selectOption2: string;
}