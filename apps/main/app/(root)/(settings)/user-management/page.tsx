import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { getPaginatedUsersWithFilters } from "@/services/actions/userService";
import { getRoleList } from "@/services/actions/rolesServices";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { UserActionButton } from "./components/action-buttons";
import UsersList from "./components/users-list";
import Pagination from "./components/pagination";
import { getOrganizationList } from "@/services/actions/organizationService";
import { type User } from "@/services/service-types";
import { ListingNotFound } from "@whilter/ui-kit/components";

const defaultSearchParams = {
  page: 0,
  size: 8,
  email: "",
  organization: "",
  role: "",
  status: true,
};

export interface OrganizationType {
  id: string;
  name: string;
  logoUrl: string;
}


export interface OptionType {
  id: string;
  name: string;
}

export interface UserActionButtonProps {
  organizationList: OrganizationType[];
  rolesList: OptionType[];
}

const ITEMS_PER_PAGE = 8;

function isFilterApplied(params: Record<string, any>): boolean {
  const { page, size, ...filters } = params;
  return Object.values(filters).some((value) => value && value.toString().trim() !== "");
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = { ...defaultSearchParams, ...(await searchParams) };


  const values = params;
  console.log("params -- ", values);

  let users: User[] = [];
  let paginatedData: {
    totalItems: number;
    totalPages: number;
    [key: string]: any;
  } = { totalItems: 0, totalPages: 0 };

  let organizationList = [];
  let rolesList = [];
  let error: unknown = null;

  try {
    const response = await getPaginatedUsersWithFilters(params);
    users = response?.content || [];
    paginatedData = {
      ...response?.pageable,
      totalItems: response?.totalElements || 0,
      totalPages: response?.totalPages || 0,
    };

    [organizationList, rolesList] = await Promise.all([
      getOrganizationList(),
      getRoleList()
    ]);
  } catch (err) {
    console.error("Error fetching users:", err);
    error = err;
  }

  const page = Array.isArray(params.page) ? params.page[0] : params.page;

  const currentPage = parseInt(page || "1");
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPages = paginatedData?.totalPages || 0;
  const totalItems = paginatedData?.totalItems || 0;

  const breadcrumbs = buildBreadcrumbs([{ label: "User", href: "/user-managment" }]);

  const actions = [
    <UserActionButton
      key="user-action-btn"
      organizationList={organizationList}
      rolesList={rolesList}
    />
  ];

  const filtersApplied = isFilterApplied(params);
 

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Users List"
      description="Choose User to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actions}
    >
      {error ? (
        filtersApplied ? (
          <UsersList
            users={[]}
            organizationList={organizationList}
            rolesList={rolesList}
            totalPages={0}
            totalItems={0}
            itemsPerPage={ITEMS_PER_PAGE}
          >
            <ListingNotFound
              title="Error loading filtered users"
              description="Something went wrong while applying your filters. Try again."
            />
          </UsersList>
        ) : (
          <ListingNotFound
            title="Error loading users"
            description="Something went wrong while fetching users. Please try again."
          />
        )
      ) : users.length === 0 ? (
        filtersApplied ? (
          <UsersList
            users={[]}
            organizationList={organizationList}
            rolesList={rolesList}
            totalPages={0}
            totalItems={0}
            itemsPerPage={ITEMS_PER_PAGE}
          >
            <ListingNotFound
              title="No results match your filters"
              description="Try adjusting filters or search again."
            />
          </UsersList>
        ) : (
          <ListingNotFound
            title="No Users Found"
            description="Your system does not have any users yet."
            buttonLabel="Create User"
          />
        )
      ) : (
        <UsersList
          users={users}
          organizationList={organizationList}
          rolesList={rolesList}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </AdminLayout>
  );
  
}

