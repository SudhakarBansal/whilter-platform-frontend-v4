import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}
export default async function EditBrandPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  const breadcrumbs = buildBreadcrumbs([
    { label: "Brands", href: "/brands" },
    { label: "Edit Brand", href: `/brands/edit/${id}` },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Edit Brand"
      description="Edit the Brand"
      config={pageLayoutPresets.dashboard}
    ></DashboardLayout>
  );
}
