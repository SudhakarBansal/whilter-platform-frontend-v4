import React, { Suspense } from "react";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import { OrganizationPageSkeleton } from "./components/skeltons/OrganizationPageSkeleton";
import { OrganizationData } from "./components/Organization";

export default async function Page({ searchParams }: { searchParams: any }) {
  const resolvedSearchParams = await searchParams;

  const breadcrumbs = buildBreadcrumbs([
    { label: "Organization", href: "/organization" },
  ]);

  const actions = [
    <ActionButton
      key="new-org"
      variant="glassmorphism"
      href="/organization/new"
    >
      New Organization
    </ActionButton>,
  ];

  console.log("Component rendered with searchParams:");
  

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Organization List"
      description="Manage Organizations"
      config={pageLayoutPresets.dashboard}
      buttons={actions}
    >
      <Suspense fallback={<OrganizationPageSkeleton />}>
        <OrganizationData searchParams={resolvedSearchParams} />
      </Suspense>
    </AdminLayout>
  );
}
