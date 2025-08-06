"use client";
import { useEffect, useState } from "react";
import type { User } from "@/services/service-types";
import { UserFilters, type UserFiltersState } from "./components/UserFilters";
import { UserCard } from "./components/UserCard";
import { UserFormDialog } from "./components/UserFormDialog";

interface Props {
  userId:any;
  users: User[];
  onDelete?: (id: string) => void;
  onEdit?: (userId: string) => void;
  filters: UserFiltersState;
  onFilterChange: (filters: Partial<{
    status?: boolean;
    email?: string;
    organizationName?: string;
    role?: string;
    preferredSection?: string;
  }>) => void;
}

export const UserListing = ({
  users,
  onDelete,
  onEdit,
  filters,
  onFilterChange,
  userId,
}: Props) => {
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string>();

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setIsDialogOpen(true);
  };




  return (
    <>
      <UserFilters filters={filters} onFilterChange={onFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={onDelete}
            onEdit={handleEditUser}

          />
        ))}
         <UserFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                userId={editingUserId}
                onSuccess={() => setIsDialogOpen(false)}
              />
      </div>
      
    </>
  );
};