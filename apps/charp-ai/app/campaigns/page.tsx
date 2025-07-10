"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CampaignCardSection from "@/components/brand-section/BrandCardSection";

export default function ViewCampaignPage() {
  const router = useRouter();

  const actionButtons = [
    <Button
      key="view-campaign"
      variant="flatPrimary"
      className="text-lg p-4"
      onClick={() => router.push("/new-campaign")}
    >
      Add New Campaign
    </Button>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Campaigns", href: "/campaigns" },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Campaigns List"
      description="Choose Campaigns to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >

    </DashboardLayout>
  );
}