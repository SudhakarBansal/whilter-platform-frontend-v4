import React from "react";
import { UserFilters } from "./filter";
import { UserCard } from "./user-card";
import { type User } from "@/services/service-types";
import { type OptionType } from "../page";


type UsersListProps = {
  users: User[];
  organizationList: OptionType[];
  rolesList: OptionType[];
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  children?: React.ReactNode
};

const UsersList = ({
  users,
  organizationList,
  rolesList,
  totalPages,
  totalItems,
  itemsPerPage,
  children
}: UsersListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <UserFilters organizationList={organizationList} rolesList={rolesList} 
      totalPages={totalPages}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
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
