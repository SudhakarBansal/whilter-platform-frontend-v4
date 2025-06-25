import { Button } from "@mui/material";
import { PageLayout, pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { recentProjects } from '@/data/recentProjects.data';
import { RecentProjects } from '@whilter/ui-kit/components'
import { ToolCardsGrid as ToolsSection } from '@/components/FeaturedTools/ToolsSection'
import OtherToolsCardGrid from "@/components/OtherTools/OtherTools";
import HeroSection from "@/components/HeroSection";
import { baseBreadcrumbs } from "@/utils/breadcrumbs/breadcrumbs";

export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>Projects Library</Button>
  ];

  const breadcrumbs = [
    ...baseBreadcrumbs,
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
      hero={<HeroSection />}
    >
      <ToolsSection />
      <RecentProjects data={recentProjects} />
      <OtherToolsCardGrid />
    </PageLayout>
  );
}
