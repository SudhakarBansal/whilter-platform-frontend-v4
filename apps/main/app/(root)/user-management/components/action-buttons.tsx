"use client";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { UserFormDialog } from "@/components/user-module/components/UserFormDialog";
import { UserCreate } from "@/components/user-module/UserCreate";
import { useRouter } from "next/navigation";

interface UserActionButtonProps {
  userId: string | any;
  fetchUsers:any;
}

export function UserActionButton({ userId,fetchUsers }: UserActionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false)
    fetchUsers({
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0
    },{
      role: '',
      status: true,
      organizationName: '',
      email: '',
      preferredSection: ''
    })
  }

  return (
    <div>
      <Button
        startIcon={<Plus />}
        variant="glassmorphism"
        onClick={handleClick}
      >
        New User
      </Button>
      <UserFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={userId}
        onSuccess={handleSuccess}
      />

    </div>
  );
}