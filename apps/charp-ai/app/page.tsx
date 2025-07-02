"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import StatCardSection from "@/components/dashboard-section/StatCardSection";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const actionButtons = [
    <Button
      key="view-campaign"
      variant="flatPrimary"
      className="text-lg p-4"
      onClick={() => router.push("/campaign")}
    >
      View Campaigns
    </Button>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },])

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Dashboard"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <StatCardSection />
    </DashboardLayout>
  );
}
