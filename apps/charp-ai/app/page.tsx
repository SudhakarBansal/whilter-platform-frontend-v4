import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { baseBreadcrumbs } from "@/utils/breadcrumbs";
import { Button } from "@mui/material";
import StatCardSection from "@/components/dashboard-section/StatCardSection";

export default function Page() {
  const actionButtons = [
    <Button variant="flatPrimary" className='text-lg p-4'>View Campaign</Button>
  ];

  const breadcrumbs = [
    ...baseBreadcrumbs,
    {
      label: 'Dashboard',
      href: '/',
    },
  ];
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
