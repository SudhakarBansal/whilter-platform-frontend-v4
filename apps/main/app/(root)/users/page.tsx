"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { UserNew } from "@/components/user-module/UserNew";


export default function ViewAdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string>();

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setIsDialogOpen(true);
  };

  const handleAddUser = () => {
    setEditingUserId(undefined);
    setIsDialogOpen(true);
  };

  const actionButtons = [
    <Button
      key="add-user"
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={handleAddUser}
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
      <UserNew
        onEditUser={handleEditUser}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={editingUserId}
      />
    </AdminLayout>
  );
}