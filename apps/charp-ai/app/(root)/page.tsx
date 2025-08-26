
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { getDashboardStats } from "@/services/actions/dashboardService";
import { mapMediaStatsToCards } from "@/data/dashboard.data";
import StatCardSection from "@/components/dashboard-section/StatCardSection";
import { ActionButton } from "@/components/atoms/ActionButton";
import { BrandDetailsTable } from "@/components/dashboard-section/BrandDetailsTable";


export default async function Page() {
  const data = await getDashboardStats();
  const finalStats = mapMediaStatsToCards(data);

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
  ]);

  const actions = [
    <ActionButton
      key="view-campaign"
      variant="flatPrimary"
      className="text-lg p-4"
      href="/campaigns"
    >
      View Campaigns
    </ActionButton>
  ];

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Dashboard"
      config={pageLayoutPresets.dashboard}
      buttons={actions}
    >
      <StatCardSection stats={finalStats} />
      <BrandDetailsTable/>
    </DashboardLayout>
  );
}
