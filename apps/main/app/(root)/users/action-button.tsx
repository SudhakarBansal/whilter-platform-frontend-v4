"use client";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { UserFormDialog } from "@/components/user-module/components/UserFormDialog";
import { UserCreate } from "@/components/user-module/UserCreate";

interface UserActionButtonProps {
  userId: string | any;
}

export function UserActionButton({ userId }: UserActionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false)
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