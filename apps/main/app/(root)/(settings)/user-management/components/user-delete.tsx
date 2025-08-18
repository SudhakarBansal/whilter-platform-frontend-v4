"use client";
import { useState } from "react";
import { DialogSection } from "@whilter/ui-kit/components";
import { deleteUser } from "@/services/actions/userService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteUserDialogProps {
  open: boolean;
  userId: string;
  userName: string;
  onDelete?: (userId: string) => void;
  onClose: () => void;
}

export const DeleteUser = ({
  open,
  userId,
  userName,
  onDelete,
  onClose,
}: DeleteUserDialogProps) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await deleteUser(userId);
      toast.success("User deleted successfully!");
      onDelete?.(userId);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete user")
      console.error("Delete error:", error)
    } finally {
      setDeleting(false);
      onClose();
    }
  };


  return (
    <DialogSection
      open={open}
      title="Delete Confirmation"
      message={
        <>
          Are you sure you want to delete{" "}
          <span className="text-red-500 font-semibold">{userName}</span>?
        </>
      }
      onConfirm={handleDelete}
      onCancel={onClose}
    />
  );
};
