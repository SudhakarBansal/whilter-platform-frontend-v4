import React from "react";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { OrganizationForm } from "../components/organization-form";

export default function NewOrganizationPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Organization", href: "/organization" },
    { label: "New Organization", href: "/organization/new" },
  ]);

  return (
    // <AdminLayout
    //   breadcrumbs={breadcrumbs}
    //   heading="Create New Organization"
    //   description="Add a new organization to the system"
    //   config={pageLayoutPresets.dashboard}
    // >
      <OrganizationForm />
    // </AdminLayout>
  );
}
