'use client';
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/utils/data/services";
import PageLayout, { pageLayoutPresets } from '@/components/styled/page-layout';

function page() {
  const breadcrumbs = [
    { label: 'Login', href: '/' },
    { label: 'Services', href: '/products' },
  ];

  const buttons = [
    <Button variant="glassmorphism">Brand Customisation</Button>,
  ];

  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      heading="Our Services"
      description="Select a service to continue"
      buttons={buttons}
      config={pageLayoutPresets.dashboard}
    >
      <Box component="main">
          <Grid container spacing={8} justifyContent="center">
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <ServiceCard
                  title={service.title}
                  image={service.image}
                />
              </Grid>
            ))}
          </Grid>
      </Box>
    </PageLayout>
  );
}

export default page;