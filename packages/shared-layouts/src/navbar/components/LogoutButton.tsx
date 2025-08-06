"use client";

import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { logout } from "@whilter/api";
import type { User, CharpErrorDetail } from "@whilter/shared-types";
import { toast } from "sonner";

interface LogoutButtonProps {
  user?: User;
  onClose?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ user, onClose }) => {

  const handleLogout = async () => {
    if (!user?.refreshToken || !user?.deviceId) {
      toast.error("Missing session details.");
      return;
    }
    try {
      const data = new FormData();
      data.append("refreshToken", user.refreshToken);
      data.append("deviceId", user.deviceId);
      const res = await logout(data);
      
      if (res.status === 200 || res.status === 201) {
         toast.success("Logout successfully");
       await signOut({ callbackUrl: "/login" });
         onClose?.();
      } else {
        toast.error("Logout failed. Try again.");
         onClose?.();
      }
    } catch (err: any) {
      const error = err as CharpErrorDetail;
      toast.error(error.message || "Logout failed.");
       onClose?.();
    }
  };

  return (
    <Button color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
      Log out
    </Button>
  );
};
