import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";

export default function ViewCampaignPage() {

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Campaigns", href: "/campaign" },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Campaigns of Dominos Pizza"
      description="Choose campaign to view details"
      config={pageLayoutPresets.dashboard}
 >
    </DashboardLayout>
  );
}