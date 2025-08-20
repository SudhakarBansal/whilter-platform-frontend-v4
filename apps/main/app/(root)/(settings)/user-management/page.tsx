import { Suspense } from "react";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { getOrganizationList } from "@/services/actions/organizationService";
import { getRoleList } from "@/services/actions/rolesServices";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { UserActionButton } from "./components/action-buttons";
import UsersList from "./components/users-list";
import { UserListSkeleton } from "./components/skeletons/UserListSkeleton";

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


export default async function Page({ searchParams }: { searchParams: any }) {
  const params = { ...defaultSearchParams, ...(await searchParams) };

  const [organizationList, rolesList] = await Promise.all([
    getOrganizationList(),
    getRoleList()
  ]);

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
      <Suspense fallback={<UserListSkeleton />}>
        <UsersList
          searchParams={params}
          organizationList={organizationList}
          rolesList={rolesList}
        />
      </Suspense>
    </AdminLayout>
  );
}
