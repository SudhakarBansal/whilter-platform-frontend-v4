interface LipSyncTemplate {
  model: string;
  'reference-video': string;
  language?: string;
  duration?: number;
  isActive?: boolean;
}

interface VoiceCloneTemplate {
  model: string;
  'reference-audio': string;
  speaker?: string;
  isActive?: boolean;
}

export const lipSyncTemp: LipSyncTemplate = {
  model: 'default-lipsync-model',
  'reference-video': 'https://example.com/sample-video.mp4',
  language: 'en',
  duration: 30,
  isActive: true,
};

export const voiceCloneTemp: VoiceCloneTemplate = {
  model: 'voice-clone-v1',
  'reference-audio': 'https://example.com/sample-audio.mp3',
  speaker: 'John Doe',
  isActive: true,
};