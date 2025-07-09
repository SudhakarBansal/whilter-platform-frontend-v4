"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CampaignCardSection from "@/components/campaign-section/CampaignCardSection";

export default function ViewCampaignPage() {
  const router = useRouter();

  const actionButtons = [
    <Button
      key="view-campaign"
      variant="flatPrimary"
      className="text-lg p-4"
      onClick={() => router.push("/campaign/new-brand")}
    >
      Add New Brand
    </Button>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Campaigns", href: "/campaign" },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Brand List"
      description="Choose Brand to manage campaigns"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <CampaignCardSection />

    </DashboardLayout>
  );
}