'use client';
import React from 'react';
import { Button } from '@mui/material';
import PageLayout, { pageLayoutPresets } from '@/components/styled/page-layout';
import { RecentProjects } from '@/components/RecentProjects';
import { ServiceCards } from '@/components/ServiceCards';
import { FolderCard } from '@/components/FolderCardSection/FolderCard';
import { projectData } from '@/utils/data/projects';
import { FolderCardSection } from '@/components/FolderCardSection';

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
      <RecentProjects />
      <FolderCardSection/>
    </PageLayout>
  );
};

export default Page;