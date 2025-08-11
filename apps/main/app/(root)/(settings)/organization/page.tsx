import React from "react";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import Pagination from "../user-management/components/pagination";
import { ActionButton } from "@/components/atoms/ActionButton/ActionButton";
import OrganizationCard from "./components/OrganizationCard";
import type { Organization } from "@/services/service-types";
import { getPaginatedOrganizatoinWithFilters } from "@/services/actions/organizationService";

const ITEMS_PER_PAGE = 10;
const defaultSearchParams = {
  page: 0,
  size: ITEMS_PER_PAGE,
  name: "",
  logoUrl: "",
  description: "",
};

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = { ...defaultSearchParams, ...(await searchParams) };

  console.log("Search Params:", params);
  

  let organizations: Organization[] = [];
  let paginatedData: {
    totalItems: number;
    totalPages: number;
    [key: string]: any;
  } = { totalItems: 0, totalPages: 0 };

  try {
    const response = await getPaginatedOrganizatoinWithFilters(params);
    organizations = response?.content || [];
    paginatedData = {
      ...response?.pageable,
      totalItems: response?.totalElements || 0,
      totalPages: response?.totalPages || 0,
    };
  } catch (error) {
    console.error("Error fetching organisation:", error);
  }

  const totalPages = paginatedData?.totalPages || 0;
  const totalItems = paginatedData?.totalItems || 0;
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
      <OrganizationCard organizations={organizations}/>
      <Pagination
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </AdminLayout>
  );
}
