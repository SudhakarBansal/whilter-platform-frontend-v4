// components/user-module/UserNew.tsx
"use client";
import { useEffect, useState } from "react";
import { allUsers } from "@/services/actions/userService";
import { UserListing } from "./UserListing";
import type { User } from "@/services/service-types";
import { UserFormDialog } from "./components/UserFormDialog";

interface UserNewProps {
  onEditUser: (userId: string) => void;
  open: boolean;
  onClose: () => void;
  userId?: string;
  onSuccess?: () => void;
}

export const UserNew = ({ onEditUser, open, onClose, userId, onSuccess }: UserNewProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await allUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
      {users.map((user) => (
        <UserListing
          key={user.id}
          user={user}
          onDelete={(id) => setUsers(prev => prev.filter(u => u.id !== id))}
          onEdit={onEditUser}
        />
      ))}
      
      <UserFormDialog
        open={open}
        onClose={onClose}
        userId={userId}
        onSuccess={() => {
          onSuccess?.();
          allUsers().then(setUsers);
        }}
      />
    </div>
  );
};