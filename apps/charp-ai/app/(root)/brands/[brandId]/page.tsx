import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import CampaignCardSection from "@/components/campaign-section/CampaignCardSection";
import { Plus } from "lucide-react";
import { ActionButton } from "@/components/atoms/ActionButton";

// Server component with async
export default async function ViewCampaignPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const brandName = brandId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/'\S/g, (match) => match.toLowerCase());

  const actionButtons = [
    <ActionButton
      key="add-campaign"
      startIcon={<Plus />}
      variant="glassmorphism"
      href={`/brands/${brandId}/campaigns/new`}
    >
      New Campaign
    </ActionButton>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: `${brandId}`, href: `/brands/${brandId}` },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading={`${brandName} Campaigns`}
      description="Choose Campaigns to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <CampaignCardSection />
    </DashboardLayout>
  );
}
