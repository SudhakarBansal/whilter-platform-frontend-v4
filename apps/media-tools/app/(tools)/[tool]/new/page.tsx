import NotFound from "@/app/not-found";
import { LipSyncMediaPanel } from "@/components/tools-media-panel/lip-sync.media";
import { VoiceCloningMediaPanel } from "@/components/tools-media-panel/voice-cloning.media";
import { getToolBySlug } from "@/lib/getToolBySlug";
import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { ToolsLayout } from "@/layouts/tools-layout";
import { LipSyncControls } from "@/components/tools-controls/lip-sync.controls";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";

// Define the ToolConfig interface
interface ToolConfig {
  header: (title: string, description: string) => JSX.Element;
  controls: () => JSX.Element;
  tool: () => JSX.Element;
}

interface NewToolPageProps {
  params: { tool: string };
}

// Combined configuration for all tool-related components
const toolConfigs: Record<string, ToolConfig> = {
  'lip-sync': {
    header: (title: string, description: string): JSX.Element => (
      <>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </>
    ),
    controls: (): JSX.Element => (
      <LipSyncControls
        projectName="New Project"
      />
    ),
    tool: () => <LipSyncMediaPanel />
  },
  'voice-cloning': {
    header: (title: string, description: string): JSX.Element => (
      <>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </>
    ),
    controls: (): JSX.Element => (
      <LipSyncControls
        projectName="New Project"
      />
    ),
    tool: () => <VoiceCloningMediaPanel />
  },
} as const;

export default function NewToolPage({ params }: NewToolPageProps) {
  if (!params.tool) {
    return <NotFound />;
  }

  const tool = getToolBySlug(params.tool);
  if (!tool) {
    return <NotFound />;
  }

  const config = toolConfigs[params.tool];
  if (!config) {
    return <NotFound />;
  }

  const breadcrumbs = buildToolBreadcrumbs(`${params.tool}`, 'new');

  return (
    <ToolsLayout
      // PageLayout props
      breadcrumbs={breadcrumbs}
      heading={tool.title}
      description={tool.description}
      config={pageLayoutPresets.dashboard}

      // ToolsLayout specific props
      headerSection={config.header(tool.title, tool.description)}
      toolsSection={<config.tool />}
      controlsSection={config.controls()}

      // Layout configuration
      splitRatio={[8, 4]}
      spacing={3}
      elevation={1}
    />
  );
}