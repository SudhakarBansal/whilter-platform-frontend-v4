import React from "react";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { OrganizationFormSkeleton } from "../../components/skeltons/OrganizationFormSkeleton";
import { OrganizationEdit } from "../../components/OrganizationEdit";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EditOrganizationPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  const breadcrumbs = buildBreadcrumbs([
    { label: "Organization", href: "/organization" },
    { label: "Edit Organization", href: `/organization/edit/${id}` },
  ]);

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Edit Organization"
      description="Edit the organization"
      config={pageLayoutPresets.dashboard}
    >
      <OrganizationEdit id={id} />
    </AdminLayout>
  );
}
