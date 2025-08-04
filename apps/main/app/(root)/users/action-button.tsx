// components/user-module/UserActionButton.tsx
"use client";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { UserCreate } from "@/components/user-module/UserCreate";

interface UserActionButtonProps {
  onOpenChange: (isOpen: boolean) => void;
}

export function UserActionButton({ onOpenChange }: UserActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    onOpenChange(true);
  };

  return (
    <div>
    <Button
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={handleClick}
    >
      New User
    </Button>
    
    </div>
  );
}