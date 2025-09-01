import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import { Plus } from "lucide-react";
import { RecentProjects } from "@whilter/ui-kit/components";
import { recentCampaigns } from "../../../data/recentCampaigns.data";
import BrandsCardSection from "@/components/brand-section/BrandCardSection";
import { ActionButton } from "@/components/atoms/ActionButton";

export default function ViewBrandPage() {
  const actionButtons = [
    <ActionButton
      key="add-brand"
      startIcon={<Plus />}
      variant="glassmorphism"
      href="/brands/new"
    >
      Add New Brand
    </ActionButton>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Brands", href: "/brands" },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Brand List"
      description="Choose Brand to manage campaigns"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <BrandsCardSection />
      <RecentProjects data={recentCampaigns} label="Recent Campaigns" />
    </DashboardLayout>
  );
}
