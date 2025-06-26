import { Box } from "@mui/material";
import { buildToolBreadcrumbs } from '@/utils/breadcrumbs/buildToolBreadcrumbs';
import { getToolBySlug } from '@/lib/getToolBySlug';
import { PageLayout, pageLayoutPresets } from '@whilter/shared-layouts/styled';
import { recentProjects } from '@/data/recentProjects.data';
import { FolderCardSection, RecentProjects } from '@whilter/ui-kit/components'
import { Plus } from 'lucide-react';
import { projectData } from "@/data/projects.data";
import NotFound from "@/app/not-found";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";

interface ToolPageProps {
  params: { tool: string };
}

export default function ToolPage({ params }: ToolPageProps) {

  // Check if params or params.tool is undefined
  if (!params || !params.tool) {
    console.error("No tool parameter found in params");
    return <NotFound/>;
  }

  const tool = getToolBySlug(params.tool);
  if (!tool) return <NotFound/>;

  const breadcrumbs = buildToolBreadcrumbs(params.tool);

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      heading={tool.title + " Projects Library"}
      description={tool.description}
      config={pageLayoutPresets.dashboard}
    >
      <Box sx={{ mb: 2 }}>
        <ActionButton
          variant="outlineSecondary"
          startIcon={<Plus />}
          href={`/${params.tool}/new`}
        >
          New Project
        </ActionButton>
      </Box>
      <RecentProjects data={recentProjects} />
      <FolderCardSection data={projectData} />
    </PageLayout>
  );
}