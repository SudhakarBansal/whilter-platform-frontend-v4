"use client"
import { UserCreate } from "./UserCreate";
import type { AddUserProps } from "@/types/addUser.types";

export const UserEdit = ({ open, onClose, userId }: AddUserProps) => {
  return (
    <UserCreate open={open} onClose={onClose} userId={userId} />
  );
};

