"use client";
import { useEffect, useState } from "react";
import { allUsers } from "@/services/user/userService";
import { UserListing } from "./UserListing";
import { UserFormDialog } from "./components/UserFormDialog";
import { CircularProgress } from "@mui/material";
import type { User } from "@/services/user/user.types"; 

interface UserNewProps {
  onEditUser: (userId: string) => void;
  open: boolean;
  onClose: () => void;
  userId?: string;
  onSuccess?: () => void;
  initialUsers: User[]; 
  onUsersUpdated: (users: User[]) => void;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
}

export const UserNew = ({ 
  onEditUser, 
  open, 
  onClose, 
  userId, 
  onSuccess, 
  initialUsers, 
  onUsersUpdated ,
  loading,
  setLoading
}: UserNewProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleSuccess = async () => {
    try {
      setLoading(true);
      const updatedUsers = await allUsers();
      setUsers(updatedUsers);
      onUsersUpdated(updatedUsers);
      onSuccess?.();
    } catch (err) {
      console.error("Failed to refresh users", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
      {users.map((user) => (
        <UserListing
          key={user.id}
          user={user}
          onDelete={(id) => {
            const newUsers = users.filter(u => u.id !== id);
            setUsers(newUsers);
            onUsersUpdated(newUsers);
          }}
          onEdit={onEditUser}
        />
      ))}
      
      <UserFormDialog
        open={open}
        onClose={onClose}
        userId={userId}
        onSuccess={handleSuccess}
      />
    </div>
  );
};