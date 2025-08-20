import React from "react";
import { UserFilters } from "./filter";
import { UserCard } from "./user-card";
import { type User } from "@/services/service-types";
import { type OptionType, type OrganizationType } from "../page";
import Pagination from "./pagination";
import { getPaginatedUsersWithFilters } from "@/services/actions/userService";

const ITEMS_PER_PAGE = 2;

type UsersListProps = {
  searchParams: Record<string, any>;
  organizationList: OrganizationType[];
  rolesList: OptionType[];
};

const UsersList = async ({
  searchParams,
  organizationList,
  rolesList,
}: UsersListProps) => {
  const response = await getPaginatedUsersWithFilters(searchParams);
  const users: User[] = response?.content || [];
  const totalPages = response?.totalPages || 0;
  const totalItems = response?.totalElements || 0;

  return (
    <div className="flex flex-col gap-6">
      <UserFilters organizationList={organizationList} rolesList={rolesList} />

      <Pagination
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            organizationList={organizationList}
            rolesList={rolesList}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
