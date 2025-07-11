import { Button } from "@mui/material";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { recentProjects } from '@/data/recentProjects.data';
import { RecentProjects } from '@whilter/ui-kit/components'
import { FeaturedToolsSection as ToolsSection } from '@/components/featured-tools/FeaturedToolsSection'
import OtherToolsSection from "@/components/other-tools/OtherToolsSection";
import HeroSection from "@/components/HeroSection";
import { baseBreadcrumbs } from "@/utils/breadcrumbs/breadcrumbs";
import PageClientLayout from "../layouts/page-client-layout/PageClientLayout";

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
    <PageClientLayout
      breadcrumbs={breadcrumbs}
      heading="Featured Tools"
      buttons={actionButtons}
      config={pageLayoutPresets.dashboard}
      hero={<HeroSection />}
    >
      <ToolsSection />
      <RecentProjects data={recentProjects} />
      <OtherToolsSection />
    </PageClientLayout>
  );
}
