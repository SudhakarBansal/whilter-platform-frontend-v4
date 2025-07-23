'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { PageLayout } from '@whilter/shared-layouts/styled';
import { pageLayoutPresets } from '@whilter/shared-layouts/styled';
import { RecentProjects } from '@whilter/ui-kit/components';
import { ServiceCardSection } from '@/components/service-cards/ServiceCardSection';
import { projectsData } from '@/utils/data/projects.data';
import { FolderCardSection } from '@whilter/ui-kit/components';
import { recentProjects } from '@/utils/data/recentProjects.data';
import { useSession } from 'next-auth/react';

function Page() {
  const { data: session } = useSession();
  console.log("session123",session)
  const role = session?.user?.role || '';
  const section = session?.user?.section || ''; 

  const actionButtons = [
    <Button variant="glassmorphism" className='text-lg py-2 px-4'>Brand Customisation</Button>
  ];

  return (
    <PageLayout
      heading="Our Services"
      description="Select a service to continue"
      buttons={actionButtons}
      config={pageLayoutPresets.dashboard}
    >
      <ServiceCardSection role={role} section={section} />
      <RecentProjects data={recentProjects} label="Recent Projects" />
      <FolderCardSection data={projectsData} />
    </PageLayout>
  );
}

export default Page;
