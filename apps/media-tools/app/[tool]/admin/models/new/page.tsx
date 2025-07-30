'use client';

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import NotFound from '@/app/not-found';
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";

export default function ModelPage({ params }: ToolPageProps) {
    const { tool: toolSlug } = params;

    // Validate tool existence
    const tool = getToolBySlug(toolSlug);
    if (!tool) return <NotFound />;

    const breadcrumbs = buildToolBreadcrumbs(toolSlug, 'modelsNew');


    return (
        <PageClientLayout
            breadcrumbs={breadcrumbs}
            heading={tool.title}
            description={tool.description}
            config={pageLayoutPresets.dashboard}
        >
            <p>Enter field inputs for models</p>
        </PageClientLayout>
    );
}