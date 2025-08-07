"use client";;
import { Button, Dialog } from "@mui/material";
import { Plus } from 'lucide-react';
import { useState } from "react";
import UserNew from "./user-new";
import { type UserActionButtonProps } from "../page";

export function UserActionButton({ organizationList, rolesList }: UserActionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={<Plus />}
        variant="glassmorphism"
        onClick={()=>setIsDialogOpen(true)}
      >
        New User
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: "bg-gradient-to-br from-blue-600 to-blue-400" }}
      >
        <UserNew
          organizationList={organizationList}
          rolesList={rolesList}
          onClose={onClose}
        />
      </Dialog>
    </div>
  );
}