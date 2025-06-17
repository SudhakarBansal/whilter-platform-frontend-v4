'use client';
import { Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/ui/layouts";
import { recentProjects } from '@/utils/recentProjects';
import { RecentProjects } from '@whilter/ui/components'


export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Brand Customisation</Button>
  ];

  return (
    <PageLayout
      // breadcrumbs={breadcrumbs}
      heading="Featured Tools"
      buttons={actionButtons}
      config={pageLayoutPresets.dashboard}
    >
      <h1>welcome to media tools</h1>
      <RecentProjects data={recentProjects} />

    </PageLayout>
  );
}
