import { getPaginatedOrganizationWithFilters } from "@/services/actions/organizationService";
import type { Organization } from "@/types/organization.types";
import OrganizationCard from "./OrganizationCard";
import Pagination from "../../user-management/components/pagination";
import { ListingNotFound } from "@whilter/ui-kit/components";

const ITEMS_PER_PAGE = 10;
const defaultSearchParams = {
  page: 0,
  size: ITEMS_PER_PAGE,
  name: "",
};

export async function OrganizationDataListing({
  searchParams,
}: {
  searchParams: any;
}) {
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

  // Show ListingNotFound when no organizations exist
  if (organizations.length === 0) {
    return (
      <ListingNotFound
        title="No Organizations Found"
        description="You can create a new organization to get started."
        buttonLabel="Create Organization"
      />
    );
  }

  return (
    <div className="!my-0">
      <div className="my-7">
        <Pagination
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
      <OrganizationCard organizations={organizations} />
    </div>
  );
}
