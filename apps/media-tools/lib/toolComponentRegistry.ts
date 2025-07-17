import { LipSyncHeader } from "@/components/tool-headers/LipSyncHeader";
import { LipSyncControls } from "@/components/tool-controls/LipSyncControls";
import { LipSyncMediaPanel } from "@/components/tool-media-panels/LipSyncMediaPanel";
import { VoiceCloneHeader } from "@/components/tool-headers/VoiceCloneHeader";
import { VoiceCloneMediaPanel } from "@/components/tool-media-panels/VoiceCloneMediaPanel";

export const toolComponentRegistry = {
  'lip-sync': {
    header: LipSyncHeader,
    controls: LipSyncControls,
    panel: LipSyncMediaPanel,
  },
  'voice-cloning': {
    header: VoiceCloneHeader,
    controls: LipSyncControls, // You had this referencing LipSyncControls
    panel: VoiceCloneMediaPanel,
  },
  // Add more tools here
};

export type ToolSlug = keyof typeof toolComponentRegistry;