import dynamic from 'next/dynamic';
import type { ToolConfig } from "@/types/tool.types";

export const getDynamicToolConfig = async (slug: string): Promise<ToolConfig | null> => {
  try {
    switch (slug) {
      case 'lip-sync':
        return {
          header: dynamic(() =>
            import("@/components/tool-header/LipSyncHeader").then(mod => ({
              default: mod.LipSyncHeader
            }))
          ),
          controls: dynamic(() =>
            import("@/components/tool-controls/LipSyncControls").then(mod => ({
              default: mod.LipSyncControls
            }))
          ),
          panel: dynamic(() =>
            import("@/components/tool-media-panel/LipSyncMediaPanel").then(mod => ({
              default: mod.LipSyncMediaPanel
            }))
          )
        };

      case 'voice-cloning':
        return {
          header: dynamic(() =>
            import("@/components/tool-header/VoiceCloneHeader").then(mod => ({
              default: mod.VoiceCloneHeader
            }))
          ),
          controls: dynamic(() =>
            import("@/components/tool-controls/LipSyncControls").then(mod => ({
              default: mod.LipSyncControls
            }))
          ),
          panel: dynamic(() =>
            import("@/components/tool-media-panel/VoiceCloneMediaPanel").then(mod => ({
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
