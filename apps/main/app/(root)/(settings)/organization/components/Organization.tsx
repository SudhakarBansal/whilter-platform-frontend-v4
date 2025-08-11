import { getPaginatedOrganizationWithFilters } from "@/services/actions/organizationService";
import type { Organization } from "@/services/service-types";
import OrganizationCard from "./OrganizationCard";
import Pagination from "../../user-management/components/pagination";


const ITEMS_PER_PAGE = 10;
const defaultSearchParams = {
  page: 0,
  size: ITEMS_PER_PAGE,
  name: "",
};

export async function OrganizationData({ searchParams }: { searchParams: any }) {
  const params = { ...defaultSearchParams, ...searchParams };

  let organizations: Organization[] = [];
  let paginatedData: {
    totalItems: number;
    totalPages: number;
    [key: string]: any;
  } = { totalItems: 0, totalPages: 0 };

  try {
    const response = await getPaginatedOrganizationWithFilters(params);
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

  return (
    <>
      <OrganizationCard organizations={organizations} />
      <Pagination
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </>
  );
}
