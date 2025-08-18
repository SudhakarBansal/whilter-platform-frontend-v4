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
  size: 6,
  email: "",
  organization: "",
  role: "",
  status: "",
};

export interface OptionType {
  id: string;
  name: string;
}

export interface UserActionButtonProps {
  organizationList: OptionType[];
  rolesList: OptionType[];
}

const ITEMS_PER_PAGE = 6;

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


  const role = params?.role;

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
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  const organizationOptions = organizationList.map((org: OptionType) => ({
    id: org.name,
    label: org.name,
  }));

  const roleOptions = rolesList.map((role: OptionType) => ({
    id: role.name,
    label: role.name,
  }));

  const page = Array.isArray(params.page) ? params.page[0] : params.page;

  const currentPage = parseInt(page || "1");
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPages = paginatedData?.totalPages || 0;
  const totalItems = paginatedData?.totalItems || 0;

  const breadcrumbs = buildBreadcrumbs([{ label: "User", href: "/user-managment" }]);

  const actions = [
    <UserActionButton
      key="user-action-btn"
      organizationList={organizationOptions}
      rolesList={roleOptions}
    />
  ];


  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Users List"
      description="Choose User to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actions}
    >
      <UsersList
        users={users}
        organizationList={organizationOptions}
        rolesList={roleOptions}
      />
      {users.length > 0 ? (
        <Pagination
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      ) : (
        <ListingNotFound
          title="No Users Found"
          description="You can create a new user to get started."
          buttonLabel="Create User"
        />
      )
      }


    </AdminLayout>
  );
}

