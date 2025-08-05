import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { getPaginatedUsersWithFilters, getRoleList } from "@/services/actions/userService";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { UserActionButton } from "./components/action-buttons";
import UsersList from "./components/users-list";
import Pagination from "./components/pagination";
import { getOrganizationList } from "@/services/actions/organization";
import { type User } from "@/services/service-types";

const defaultSearchParams = {
  page: "0",
  size: "8",
  email: "",
  organization: "",
  role: "",
  status: "",
};



const ITEMS_PER_PAGE = 10;

export default async function Page({ searchParams }: { searchParams: any }) {
  const params = { ...defaultSearchParams, ...(await searchParams) };
  
  let users: User[] = [];
  let paginatedData: {
    totalItems: number;
    totalPages: number;
    [key: string]: any;
  } = { totalItems: 0, totalPages: 0 };

  let organizationList = [];
  let rolesList = [];

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

  console.log("organizationList",organizationList,rolesList)

  const page = Array.isArray(params.page) ? params.page[0] : params.page;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;

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

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Users List"
      description="Choose User to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actions} 
    >
      <UsersList users={users} defaultValue={email} />
      <Pagination
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </AdminLayout>
  );
}
