"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CampaignCardSection from "@/components/campaign-section/CampaignCardSection";
import { Plus } from 'lucide-react';

export default function ViewCampaignPage() {
  const router = useRouter();

  const handleAddNewCampaign = () => {
    router.push("/campaigns/new");
  };

  const actionButtons = [
    <Button
      key="add-campaign"
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={handleAddNewCampaign}
    >
      New Campaign
    </Button>
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
      <CampaignCardSection />

    </DashboardLayout>
  );
}