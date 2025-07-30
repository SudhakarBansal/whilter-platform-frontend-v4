"use client";
import { useState } from "react";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { UserNew } from "@/components/user-module/UserNew";
import { UserCreate } from '@/components/user-module/UserCreate'

export default function ViewAdminPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | undefined>();

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setIsAddUserOpen(true);
  };

  const handleCloseAddUser = () => {
    setEditingUserId(undefined);
    setIsAddUserOpen(false);
  };

  const handleAddNewUser = () => {
    setIsAddUserOpen(true)
  }

  const actionButtons = [
    <Button
      key="add-user"
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={handleAddNewUser}
    >
      New User
    </Button>
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "User", href: "/users" },
  ]);

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="User Listing"
      description="Choose User to manage"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <UserNew onEditUser={handleEditUser}/>
      <UserCreate open={isAddUserOpen} onClose={handleCloseAddUser} userId={editingUserId} />
    </AdminLayout>
  );
}