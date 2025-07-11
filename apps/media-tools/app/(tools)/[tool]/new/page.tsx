import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { ToolsLayout } from "@/layouts/tool-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import { getDynamicToolConfig } from '@/lib/getDynamicToolConfig';
import NotFound from '@/app/not-found';

export default async function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = params;

  // Validate tool existence
  const tool = getToolBySlug(toolSlug);
  if (!tool) return <NotFound />;

  // Load dynamic config
  const config = await getDynamicToolConfig(toolSlug);
  if (!config) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(toolSlug, 'new');

  return (
    <ToolsLayout
      breadcrumbs={breadcrumbs}
      heading={tool.title}
      description={tool.description}
      config={pageLayoutPresets.dashboard}
      headerSection={<config.header />}
      toolsSection={<config.panel />}
      controlsSection={<config.controls />}
      splitRatio={[8, 4]}
      spacing={3}
      elevation={1}
    />
  );
}