'use client';

import { useEffect, useState } from "react";
import NotFound from "@/app/not-found";
import { LipSyncMediaPanel } from "@/components/tools-media-panel/lip-sync.media";
import { VoiceCloningMediaPanel } from "@/components/tools-media-panel/voice-cloning.media";
import { getToolBySlug } from "@/lib/getToolBySlug";
import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { ToolsLayout } from "@/layouts/tools-layout";
import { LipSyncControls } from "@/components/tools-controls/lip-sync.controls";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";

interface ToolConfig {
  header: (title: string, description: string) => JSX.Element;
  controls: () => JSX.Element;
  tool: () => JSX.Element;
}

interface NewToolPageProps {
  params: { tool: string };
}

const toolConfigs: Record<string, ToolConfig> = {
  'lip-sync': {
    header: (title, description) => (
      <>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </>
    ),
    controls: () => <LipSyncControls />,
    tool: () => <LipSyncMediaPanel />
  },
  'voice-cloning': {
    header: (title, description) => (
      <>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </>
    ),
    controls: () => <LipSyncControls />,
    tool: () => <VoiceCloningMediaPanel />
  }
};

export default function NewToolPage({ params }: NewToolPageProps) {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPage(true), 4000); // 4 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (!showPage) {
    // 👇 Loader (you can customize this)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold animate-pulse">Loading tool...</div>
      </div>
    );
  }

  if (!params.tool) return <NotFound />;

  const tool = getToolBySlug(params.tool);
  if (!tool) return <NotFound />;

  const config = toolConfigs[params.tool];
  if (!config) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(params.tool, 'new');

  return (
    <ToolsLayout
      breadcrumbs={breadcrumbs}
      heading={tool.title}
      description={tool.description}
      config={pageLayoutPresets.dashboard}
      headerSection={config.header(tool.title, tool.description)}
      toolsSection={<config.tool />}
      controlsSection={config.controls()}
      splitRatio={[8, 4]}
      spacing={3}
      elevation={1}
    />
  );
}
