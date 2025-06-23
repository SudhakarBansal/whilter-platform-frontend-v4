import { Box, Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { recentProjects } from '@/lib/recentProjects.data';
import { FolderCardSection, RecentProjects } from '@whilter/ui-kit/components'
import { Plus } from 'lucide-react';
import { projectData } from "@/lib/projects.data";
import { baseBreadcrumbs } from "@/utils/breadcrumbs/breadcrumbs";

const breadcrumbs = [
  ...baseBreadcrumbs,
  {
    label: 'Media Tools',
    href: '/',
  },
  { label: 'Lip Sync', href: '/lip-sync' },
];

export default function Page() {

  //make this search button
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Projects Library</Button>
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      heading="Lip Sync Tools Library"
      // buttons={actionButtons}  // make this search button
      config={pageLayoutPresets.dashboard}
    >
      <Box>
        <Button variant="outlineSecondary" >New Project <Plus /></Button>
      </Box>
      <RecentProjects data={recentProjects} />
      <FolderCardSection data={projectData} />
    </PageLayout>
  );
}
