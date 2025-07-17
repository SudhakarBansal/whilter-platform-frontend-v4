'use client';

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { ToolsLayout } from "@/layouts/tool-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import NotFound from '@/app/not-found';
import { FormContainer } from "@whilter/forms";
import type { VoiceCloneFormValues } from "@/types";
import { toolComponentRegistry, type ToolSlug } from "@/lib/toolComponentRegistry";
import { getToolDefaultValues } from "@/lib/getDefaultToolValues";

export default function ToolPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = params;

  // Validate tool existence
  const tool = getToolBySlug(toolSlug);
  if (!tool) return <NotFound />;

  // Get components from registry
  const componentConfig = toolComponentRegistry[toolSlug as ToolSlug];
  if (!componentConfig) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(toolSlug, 'new');

  const defaultValues = getToolDefaultValues(toolSlug);

  const onSubmit = async (data: VoiceCloneFormValues) => {
    console.log('Complete form data:', data);
  };

  const HeaderComponent = componentConfig.header;
  const PanelComponent = componentConfig.panel;
  const ControlsComponent = componentConfig.controls;

  return (
    <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
      <ToolsLayout
        breadcrumbs={breadcrumbs}
        heading={tool.title}
        description={tool.description}
        config={pageLayoutPresets.dashboard}
        headerSection={<HeaderComponent />}
        toolsSection={<PanelComponent />}
        controlsSection={<ControlsComponent />}
        splitRatio={[8, 4]}
        spacing={3}
        elevation={1}
      />
    </FormContainer>
  );
}