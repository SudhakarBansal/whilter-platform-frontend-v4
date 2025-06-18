'use client';
import { Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/ui/layouts";
import { recentProjects } from '@/utils/recentProjects';
import { RecentProjects } from '@whilter/ui/components'
import {ToolCardsGrid as ToolsSection} from '@/components/ToolsSection'


export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Brand Customisation</Button>
  ];

  return (
    <>
      <h1 className="mb-10">welcome to media tools</h1>
      <PageLayout
        // breadcrumbs={breadcrumbs}
        heading="Featured Tools"
        buttons={actionButtons}
        config={pageLayoutPresets.dashboard}
      >
        <ToolsSection/>
        <RecentProjects data={recentProjects} />
      </PageLayout>
    </>
  );
}
