'use client';
import { Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/ui/layouts";
import { recentProjects } from '@/utils/recentProjects';
import { RecentProjects } from '@whilter/ui/components'
import { ToolCardsGrid as ToolsSection } from '@/components/FeaturedTools/ToolsSection'
import OtherToolsCardGrid from "@/components/OtherTools/OtherTools";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL;


export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Brand Customisation</Button>
  ];

  const breadcrumbs = [
    {
      label: 'Home',
      href: MAIN_URL,
    },
    {
      label: 'Media Tools',
      href: '/',
    },
  ];


  return (
    <PageLayout
      breadcrumbs={breadcrumbs}
      heading="Featured Tools"
      buttons={actionButtons}
      config={pageLayoutPresets.dashboard}
    >
      <ToolsSection />
      <RecentProjects data={recentProjects} />
      <OtherToolsCardGrid />
    </PageLayout>
  );
}
