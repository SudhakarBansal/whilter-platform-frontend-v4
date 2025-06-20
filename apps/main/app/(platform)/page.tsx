'use client';
import React from 'react';
import { Button } from '@mui/material';
import { PageLayout, pageLayoutPresets } from '@whilter/ui-kit/layouts';
import { RecentProjects } from '@whilter/ui-kit/components';
import { ServiceCards } from '@/components/ServiceCards';
import { projectData } from '@/utils/data/projects';
import { FolderCardSection } from '@whilter/ui-kit/components'
import { recentProjects } from '@/utils/data/recentProjects';

function Page() {
  const actionButtons = [
    <Button variant="glassmorphism" className='text-lg py-2 px-4'>Brand Customisation</Button>
  ];

  return (
    <PageLayout
      // breadcrumbs={breadcrumbs}
      heading="Our Services"
      description="Select a service to continue"
      buttons={actionButtons}
      config={pageLayoutPresets.dashboard}
    >
      <ServiceCards />
      <RecentProjects data={recentProjects} />
      <FolderCardSection data={projectData} />
    </PageLayout>
  );
};

export default Page;