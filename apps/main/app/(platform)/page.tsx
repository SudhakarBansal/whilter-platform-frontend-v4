'use client';
import React from 'react';
import { Button } from '@mui/material';
import PageLayout, { pageLayoutPresets } from '@/components/styled/page-layout';
import { RecentProjects } from '@/components/RecentsProjects';
import { ServiceCards } from '@/components/ServiceCards';

function Page() {
  const breadcrumbs = [
    { label: 'Login', href: '/' },
    { label: 'Services', href: '/products' },
  ];

  const buttons = [
    <Button variant="glassmorphism">Brand Customisation</Button>
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      heading="Our Services"
      description="Select a service to continue"
      buttons={buttons}
      config={pageLayoutPresets.dashboard}
    >
      <ServiceCards/>
      <RecentProjects />
    </PageLayout>
  );
};

export default Page;