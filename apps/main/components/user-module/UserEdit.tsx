"use client";
import { useEffect, useState } from "react";
import { updateUser, getUserById } from "@/services/user/userService";
import { UserCreate } from "./UserCreate";
import type { AddUserProps } from "@/types/addUser.types";
import { useForm } from "react-hook-form"
import { userFormInitialValues,type UserFormValues } from "@/utils/data/userFormInitialValues";
import { toast } from "sonner";

export const UserEdit = ({ open, onClose, userId }: AddUserProps) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<UserFormValues>({ defaultValues: userFormInitialValues });


  const handleUpdate = async (data: UserFormValues) => {
    if (!userId) return;
    try {
      setLoading(true);

      const payload = {
        name: data.name,
        email: data.email,
        role: data.role,
        organizationName: data.organizationName,
        preferredSections: data.preferredSections,
        status: data.status,
        orgLevelAccess: data.orgLevelAccess ?? false,
      };

      const message = await updateUser(userId, payload);
      toast.success(message || "User updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserCreate
      open={open}
      onClose={onClose}
      userId={userId}
      handleSubmit={handleUpdate}
    />
  );
};
