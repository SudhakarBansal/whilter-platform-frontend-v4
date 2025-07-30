"use client";
import { useState } from "react";
import { DialogSection } from "@whilter/ui-kit/components";
import { deleteUser } from "@/services/actions/userService";

interface DeleteUserDialogProps {
    open: boolean;
    userId: string;
    userName: string;
    onDelete?: (userId: string) => void;
    onClose: () => void;
  }

export const UserDelete = ({
    open,
    userId,
    userName,
    onDelete,
    onClose,
}: DeleteUserDialogProps) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
          setDeleting(true);
          await deleteUser(userId);
          onDelete?.(userId);
        } catch (error: any) {
          alert(error.message);
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
