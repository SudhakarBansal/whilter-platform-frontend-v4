import DashboardLayout from "@/layouts/dashboard-layout";
import AddNewBrand from "@/components/brand-section/AddNewBrand";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";

export default async function NewCampaignPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const brandName = brandId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/'\S/g, (match) => match.toLowerCase());

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: `${brandId}`, href: `/brands/${brandId}` },
    { label: "Campaigns", href: `/brands/${brandId}/campaigns` },
    { label: "New", href: `/brands/${brandId}/campaigns/new` },
  ]);

  return (
    <DashboardLayout
      heading={`New Campaign for ${brandName}`}
      description="Fill details to create a new Campaign"
      breadcrumbs={breadcrumbs}
      config={pageLayoutPresets.dashboard}
    >
      <AddNewBrand />
    </DashboardLayout>
  );
}
