'use client';

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import NotFound from '@/app/not-found';
import { FormContainer } from "@whilter/forms";
import type { VoiceCloneFormValues } from "@/types";
import { toolComponentRegistry, type ToolSlug } from "@/lib/toolComponentRegistry";
import { getToolDefaultValues } from "@/lib/getDefaultToolValues";
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";

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

  const PanelComponent = componentConfig.panel;
  const ControlsComponent = componentConfig.controls;

  return (
    <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
      <PageClientLayout
        breadcrumbs={breadcrumbs}
        heading={tool.title}
        description={tool.description}
        config={pageLayoutPresets.dashboard}
      >
        {/* Layout Container */}
        <div className="flex flex-col min-h-screen gap-2">
          {/* Content Wrapper */}
          <div className="flex flex-col flex-1 gap-3 md:gap-4">
            {/* Tools Container */}
            <div className="grid gap-3 lg:gap-8 flex-1 grid-cols-1 lg:grid-cols-12 items-start">
              {/* Tools Section - 8/12 columns */}
              <div className="lg:col-span-8 flex flex-col min-h-[500px] bg-transparent">
                <PanelComponent />
              </div>

              {/* Controls Section - 4/12 columns */}
              <div className="lg:col-span-4 p-6 md:p-6 flex flex-col min-h-[500px] h-full bg-gradient-to-b from-blue-400 to-blue-800 shadow-sm rounded-[1rem] lg:sticky lg:top-2 lg:self-start lg:h-auto">
                <ControlsComponent />
              </div>
            </div>
          </div>
        </div>
      </PageClientLayout>
    </FormContainer>
  );
}