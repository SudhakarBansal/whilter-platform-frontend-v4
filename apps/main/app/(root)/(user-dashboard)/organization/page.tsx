import React, { Suspense } from "react";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import { OrganizationDataListing } from "./components/OrganizationDataListing";
import { OrganizationFilters } from "./components/OrganizationFilters";
import { OrganizationPageSkeleton } from "./components/skeltons/OrganizationPageSkeleton";

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

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Organization List"
      description="Manage Organizations"
      config={pageLayoutPresets.dashboard}
      buttons={actions}
    >
      <OrganizationFilters />
      <Suspense fallback={<OrganizationPageSkeleton />}>
        <OrganizationDataListing searchParams={resolvedSearchParams} />
      </Suspense>
    </AdminLayout>
  );
}
