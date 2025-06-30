import dynamic from 'next/dynamic';
import type { ToolConfig } from "@/types/tool.types";

export const getDynamicToolConfig = async (slug: string): Promise<ToolConfig | null> => {
  try {
    switch (slug) {
      case 'lip-sync':
        return {
          header: dynamic(() =>
            import("@/components/tools-header/LipSyncHeader").then(mod => ({
              default: mod.LipSyncHeader
            }))
          ),
          controls: dynamic(() =>
            import("@/components/tools-controls/lip-sync.controls").then(mod => ({
              default: mod.LipSyncControls
            }))
          ),
          panel: dynamic(() =>
            import("@/components/tools-media-panel/lip-sync.media").then(mod => ({
              default: mod.LipSyncMediaPanel
            }))
          )
        };

      case 'voice-cloning':
        return {
          header: dynamic(() =>
            import("@/components/tools-header/VoiceCloneHeader").then(mod => ({
              default: mod.VoiceCloneHeader
            }))
          ),
          controls: dynamic(() =>
            import("@/components/tools-controls/lip-sync.controls").then(mod => ({
              default: mod.LipSyncControls
            }))
          ),
          panel: dynamic(() =>
            import("@/components/tools-media-panel/voice-clone.media").then(mod => ({
              default: mod.VoiceCloneMediaPanel
            }))
          )
        };

      default:
        return null;
    }
  } catch (error) {
    console.error('Error loading tool config:', error);
    return null;
  }
};
