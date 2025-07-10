"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CampaignCardSection from "@/components/campaign-section/CampaignCardSection";

export default function ViewBrandPage() {
  const router = useRouter();

  const actionButtons = [
    <Button
      key="view-campaign"
      variant="flatPrimary"
      className="text-lg p-4"
      onClick={() => router.push("/brands/new")}
    >
      Add New Brand
    </Button>,
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
      <div className="text-right mb-4">
        view all
      </div>

      <CampaignCardSection />

    </DashboardLayout>
  );
}