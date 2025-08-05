import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { UserNew } from "@/components/user-module/UserNew";
import { getPaginatedUsersWithFilters } from "@/services/actions/userService";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { UserActionButton } from "../users/action-button";
import UsersList from "./components/users-list";

const defaultSearchParams = {
  page: "1",
 
  size: "8",
};

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  mobileNumber: string;
  organizationName: string;
  status: boolean;
}

const ITEMS_PER_PAGE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: any;
}) {
  console.log("searchParams",searchParams);
  const params = { ...defaultSearchParams, ...(await searchParams) };
  let users: User[] = [];
  let paginatedData: {
    totalItems: number;
    totalPages: number;
    [key: string]: any;
  } = { totalItems: 0, totalPages: 0 };
  try {
    console.log("params",params);
    let response = await getPaginatedUsersWithFilters(params);
    users = response?.content || [];
    let totalPages = response?.totalPages || 0;
    let totalItems = response?.totalElements || 0;
    let pageable = response?.pageable || {};
    paginatedData = { ...pageable, totalItems, totalPages };
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  // Safely get search params with fallbacks
  const page = Array.isArray(params.page) ? params.page[0] : params.page;
  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const size = Array.isArray(params.size) ? params.size[0] : params.size;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const organizationName = Array.isArray(params.organizationName)
    ? params.organizationName[0]
    : params.organizationName;

  const searchTerm = email;

  // Pagination calculations
  const currentPage = parseInt(page || 1);
  const totalPages = paginatedData?.totalPages || 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalItems = paginatedData?.totalItems || 0;

  const breadcrumbs = buildBreadcrumbs([
    { label: "User", href: "/users" },
  ]);

  console.log("params",params);

  return (
    <AdminLayout  
    breadcrumbs={breadcrumbs}
    heading="User Listi"
    description="Choose User to manage"
    config={pageLayoutPresets.dashboard}
    buttons={<UserActionButton />}
    >
      <UsersList users={users} />
      </AdminLayout>
  );
}