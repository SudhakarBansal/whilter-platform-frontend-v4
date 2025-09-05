import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { buildBreadcrumbs } from "@/utils/breadcrumbs/buildBreadcrumbs";
import BrandForm from "../components/brand-form";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
export default function BrandListingPage(): JSX.Element {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: "New Brand", href: "/brands/new" },
  ]);

  return (
    <DashboardLayout
      heading="Add New Brand"
      description="Fill details to create a new brand"
      breadcrumbs={breadcrumbs}
      config={pageLayoutPresets.dashboard}
    >
      <BrandForm />
    </DashboardLayout>
  );
}
