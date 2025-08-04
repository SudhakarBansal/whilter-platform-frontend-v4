"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { UserNew } from "@/components/user-module/UserNew";
import { UserFormDialog } from "@/components/user-module/components/UserFormDialog";
import { UserActionButton } from "./action-button";

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
    <UserActionButton
      userId={editingUserId}
    />
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "User", href: "/users" },
  ]);

  const handleSuccess = () => {
    setIsDialogOpen(false)
  }

    const fetchUsers = async () => {
      try {
        // setLoading(true);
        const response = await getPaginatedUsersWithFilters({
          page: pagination.page,
          size: pagination.size,
          ...filters,
        });
        setUsers(response.content);
        setPagination(prev => ({
          ...prev,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        }));
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    
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
      <UserFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userId={editingUserId}
        onSuccess={handleSuccess}
      />
    </AdminLayout>
  );
}