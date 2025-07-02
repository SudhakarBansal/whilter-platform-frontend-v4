import React from 'react';
import { Button } from '@mui/material';
import { PageLayout } from '@whilter/shared-layouts/styled';
import { pageLayoutPresets } from '@whilter/shared-layouts/styled';
import { RecentProjects } from '@whilter/ui-kit/components';
import { ServiceCardSection } from '@/components/service-cards/ServiceCardSection';
import { projectsData } from '@/utils/data/projects.data';
import { FolderCardSection } from '@whilter/ui-kit/components'
import { recentProjects } from '@/utils/data/recentProjects.data';

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
      <ServiceCardSection />
      <RecentProjects data={recentProjects} />
      <FolderCardSection data={projectsData} />
    </PageLayout>
  );
}

export default Page;