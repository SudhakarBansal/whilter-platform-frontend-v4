"use client";

import { useEffect, useState } from "react";
import { allUsers, registerUser } from "@/services/user/userService";
import { UserListing } from "./UserListing";
import type { User } from "@/services/user/user.types"
import { UserCreate } from "./UserCreate";
import { type UserFormValues } from "@/utils/data/userFormInitialValues"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { RegisterCredentials } from "@/services/user/user.types"
import encryptPassword from "@/utils/password-encryption"

interface UserCardSectionProps {
  onEditUser: (userId: string) => void;
  open: boolean
  onClose: () => void
  userId?: string
}

export const UserNew = ({ onEditUser, open, onClose, userId }: UserCardSectionProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await allUsers();
        setUsers(fetchedUsers);
      } catch (err: any) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (data: UserFormValues) => {
        try {
            setLoading(true);

            const encryptedPassword = encryptPassword(data.password);
            const payload: RegisterCredentials = {
                name: data.name,
                email: data.email,
                password: encryptedPassword,
                role: data.role,
                organizationName: data.organizationName,
                preferredSections: data.preferredSections,
                status: data.status,
                orgLevelAccess: data.orgLevelAccess ?? false
            };
                const message = await registerUser(payload);
                toast.success(message || "User registered successfully");

            onClose();
        } catch (error: any) {
            const errorMessage = error?.message || "Operation failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
      {users.map((user) => (
        <UserListing
          key={user.id}
          user={user}
          onDelete={(id) => {
            setUsers((prev) => prev.filter((u) => u.id !== id));
          }}
          onEdit={onEditUser}
        />
      ))}
      <UserCreate
        open={open}
        onClose={onClose}
        userId={userId}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

    
