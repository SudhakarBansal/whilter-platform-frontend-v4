"use client";
import { useEffect, useState } from "react";
import { getUserById,registerUser,updateUser } from "@/services/actions/userService";
import { UserCreate } from "../UserCreate";
import  type { UserFormValues } from "@/model/userFormInitialValues";
import { toast } from "sonner";
import encryptPassword from "@/utils/password-encryption";

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  userId?: string;
  onSuccess: () => void;
}

export const UserFormDialog = ({ open, onClose, userId, onSuccess }: UserDialogProps) => {
  const [userData, setUserData] = useState<UserFormValues | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setUserData(null);
        return;
      }
      
      setLoading(true);
      try {
        const fetched = await getUserById(userId);
        setUserData({
          name: fetched.name,
          email: fetched.email,
          role: fetched.role,
          organizationName: fetched.organizationName,
          preferredSections: fetched.preferredSections,
          status: fetched.status,
          orgLevelAccess: fetched.orgLevelAccess ?? false,
          password: "",
        });
      } catch (err) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchUser();
  }, [open, userId]);

  const handleSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      
      if (userId) {
        const { password, ...updateData } = data;
        const message = await updateUser(userId, updateData);
        toast.success(message || "User updated successfully");
      } else {
        const encryptedPassword = encryptPassword(data.password);
        const payload = {
          ...data,
          password: encryptedPassword
        };
        const message = await registerUser(payload);
        toast.success(message || "User registered successfully");
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || (userId ? "Failed to update user" : "Failed to register user"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserCreate
      open={open}
      onClose={onClose}
      handleSubmit={handleSubmit}
      isEditMode={!!userId}
      defaultValues={userData || undefined}
    />
  );
};