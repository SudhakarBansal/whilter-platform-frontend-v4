'use client';
import { Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/ui/layouts";
import { recentProjects } from '@/utils/recentProjects';
import { RecentProjects } from '@whilter/ui/components'
import { ToolCardsGrid as ToolsSection } from '@/components/FeaturedTools/ToolsSection'
import OtherToolsCardGrid from "@/components/OtherTools/OtherTools";


export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Brand Customisation</Button>
  ];

  const breadcrumbs = [
    {
      label: 'Home',
      href: 'https://platform-whilter-main.netlify.app/',
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
