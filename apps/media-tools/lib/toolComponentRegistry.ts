import { LipSyncControls } from "@/components/tool-controls/LipSyncControls";
import { VoiceCloneControls } from "@/components/tool-controls/VoiceCloneControls";
import { LipSyncMediaPanel } from "@/components/tool-media-panels/LipSyncMediaPanel";
import { VoiceCloneMediaPanel } from "@/components/tool-media-panels/VoiceCloneMediaPanel";

export const toolComponentRegistry = {
  'lip-sync': {
    controls: LipSyncControls,
    panel: LipSyncMediaPanel,
  },
  'voice-cloning': {
    controls: VoiceCloneControls,
    panel: VoiceCloneMediaPanel, 
  },
  // Add more tools here
};

export type ToolSlug = keyof typeof toolComponentRegistry;