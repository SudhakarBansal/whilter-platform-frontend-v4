'use client';
import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import PageLayout, { pageLayoutPresets } from '@/components/styled/page-layout';
import { services } from "@/utils/data/services";

import { ServiceCard } from '@/components/ServiceCard';

interface Service {
  id: string;
  title: string;
  image: string;
}

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
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-14 w-full">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            image={service.image}
          />
        ))}
      </Box>
    </PageLayout>
  );
};

export default Page;