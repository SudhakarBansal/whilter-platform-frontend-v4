'use client';

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from '@/types/tool.types';
import NotFound from '@/app/not-found';
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import { Plus } from "lucide-react";
import { Button } from "@mui/material";

export default function ModelPage({ params }: ToolPageProps) {
    const { tool: toolSlug } = params;

    // Validate tool existence
    const tool = getToolBySlug(toolSlug);
    if (!tool) return <NotFound />;

    const breadcrumbs = buildToolBreadcrumbs(toolSlug, 'models');

    const actionButtons = [
        <ActionButton
            variant="outlineSecondary"
            startIcon={<Plus />}
            href={`/${params.tool}/admin/models/new`}
        >
            Add New Model
        </ActionButton>
    ];


    return (
        <PageClientLayout
            breadcrumbs={breadcrumbs}
            heading={tool.title + " Models"}
            // description={tool.description}
            config={pageLayoutPresets.dashboard}
            buttons={actionButtons}
        >

            <p>Listing of models</p>
        </PageClientLayout>
    );
}