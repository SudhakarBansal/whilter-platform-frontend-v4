import { MAX_CHARACTERS_IN_TEXT_INPUT } from "@/constants";
import type { VoiceCloneFormInitialValues, VoiceCloneFormValues } from "@/types";

export function isTextInput(data: VoiceCloneFormInitialValues): data is VoiceCloneFormInitialValues & { inputOption: 'text' } {
    return data.inputOption === 'text';
}

export function isAudioFileInput(data: VoiceCloneFormInitialValues): data is VoiceCloneFormInitialValues & { inputOption: 'audioFile' } {
    return data.inputOption === 'audioFile';
}

export function isRecordAudioInput(data: VoiceCloneFormInitialValues): data is VoiceCloneFormInitialValues & { inputOption: 'recordAudio' } {
    return data.inputOption === 'recordAudio';
}

// Clean form data to match the discriminated union
export function cleanVoiceCloneFormData(data: VoiceCloneFormInitialValues): VoiceCloneFormValues {
    const baseData = {
        projectName: data.projectName,
        audioLengthMs: data.audioLengthMs,
        keepSilenceDurationMs: data.keepSilenceDurationMs,
        silenceLengthMs: data.silenceLengthMs,
        speed: data.speed,
        pitch: data.pitch,
        speechRate: data.speechRate,
        modalName: data.modalName,
        language: data.language,
        tags: data.tags,
    };

    switch (data.inputOption) {
        case 'text':
            return {
                ...baseData,
                inputOption: 'text',
                textContent: data.textContent,
            } as VoiceCloneFormValues;

        case 'audioFile':
            return {
                ...baseData,
                inputOption: 'audioFile',
                sourceAudio: data.sourceAudio,
            } as VoiceCloneFormValues;

        case 'recordAudio':
            return {
                ...baseData,
                inputOption: 'recordAudio',
                recordedAudio: data.recordedAudio,
            } as VoiceCloneFormValues;

        default:
            throw new Error(`Unknown input option: ${(data as any).inputOption}`);
    }
}

// Validation function that works with the discriminated union
export function validateVoiceCloneFormData(data: VoiceCloneFormInitialValues): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Common validations
    if (!data.inputOption) {
        errors.push('Please select an input type');
    }

    if (!data.modalName) {
        errors.push('Please select a modal');
    }

    if (!data.language) {
        errors.push('Please select a language');
    }

     if (!data.projectName) {
        errors.push('Please enter a valid project name');
    }

    // Input-specific validations
    switch (data.inputOption) {
        case 'text':
            if (!data.textContent || data.textContent.trim().length === 0) {
                errors.push('Please enter text content');
            }
            if (data.textContent && data.textContent.length > MAX_CHARACTERS_IN_TEXT_INPUT) {
                errors.push(`Text content is too long (max ${MAX_CHARACTERS_IN_TEXT_INPUT} characters)`);
            }
            break;

        case 'audioFile':
            if (!data.sourceAudio) {
                errors.push('Please upload an audio file');
            }
            break;

        case 'recordAudio':
            if (!data.recordedAudio) {
                errors.push('Please record audio');
            }
            break;

        default:
            errors.push('Invalid input option selected');
    }

    // Additional validations
    if (data.speed < 0.1 || data.speed > 3) {
        errors.push('Speed must be between 0.1 and 3');
    }

    if (data.speechRate < 0.1 || data.speechRate > 3) {
        errors.push('Speech rate must be between 0.1 and 3');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}