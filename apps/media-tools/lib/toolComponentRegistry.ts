import LipSyncTool from "@/components/tools/LipSyncTool";
import VirtualTryonTool from "@/components/tools/VirtualTryonTool";
import VoiceCloneTool from "@/components/tools/VoiceCloneTool";

export const toolComponentRegistry = {
  "lip-sync": LipSyncTool,
  "voice-cloning": VoiceCloneTool,
  "virtual-tryon": VirtualTryonTool,
  // Add more tools here
};

export type ToolSlug = keyof typeof toolComponentRegistry;
