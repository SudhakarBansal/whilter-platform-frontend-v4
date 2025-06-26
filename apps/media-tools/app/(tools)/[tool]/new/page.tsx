import NotFound from "@/app/not-found";
import { LipSyncTool } from "@/components/tools/LipSyncTool";
import { VoiceCloningTool } from "@/components/tools/VoiceCloningTool";
import { getToolBySlug } from "@/lib/getToolBySlug";

interface NewToolPageProps {
  params: { tool: string };
}

// Map tool slugs
const toolComponents = {
  'lip-sync': LipSyncTool,
  'voice-cloning': VoiceCloningTool,
  // 'text-to-speech': TextToSpeechTool,
} as const;

export default function NewToolPage({ params }: NewToolPageProps) {
  if (!params.tool) {
    return <NotFound />;
  }

  const tool = getToolBySlug(params.tool);
  if (!tool) {
    return <NotFound />;
  }

  const ToolComponent = toolComponents[params.tool as keyof typeof toolComponents];

  if (!ToolComponent) {
    return <NotFound />;
  }

  return <ToolComponent />;
}