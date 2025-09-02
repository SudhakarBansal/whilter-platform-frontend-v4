import Box from "@mui/material/Box";
import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { getToolBySlug } from "@/lib/getToolBySlug";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { recentProjects } from "@/data/recentProjects.data";
import { FolderCardSection, RecentProjects } from "@whilter/ui-kit/components";
import { Plus, SlidersHorizontal } from "lucide-react";
import { projectsData } from "@/data/projects.data";
import NotFound from "@/app/(root)/not-found";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";

interface ToolsListingPageProps {
  params: { tool: string };
}

export default function ToolsListingPage({ params }: ToolsListingPageProps) {
  // Check if params or params.tool is undefined
  if (!params || !params.tool) {
    console.error("No tool parameter found in params");
    return <NotFound />;
  }

  const tool = getToolBySlug(params.tool);
  if (!tool) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(params.tool);

  return (
    <PageClientLayout
      breadcrumbs={breadcrumbs}
      heading={tool.title + " Projects Library"}
      description={tool.description}
      config={pageLayoutPresets.dashboard}
    >
      <Box display={"flex"} sx={{ gap: 2 }}>
        <ActionButton
          variant="outlineSecondary"
          startIcon={<Plus />}
          href={`/${params.tool}/new`}
        >
          New Project
        </ActionButton>
        <ActionButton
          variant="outlineSecondary"
          startIcon={<SlidersHorizontal />}
          href={`/${params.tool}/admin/models`}
        >
          Manage Models
        </ActionButton>
      </Box>
      <RecentProjects data={recentProjects} label="Recent Projects" />
      <FolderCardSection data={projectsData} />
    </PageClientLayout>
  );
}
