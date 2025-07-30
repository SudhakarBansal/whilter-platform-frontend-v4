"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { UserNew } from "@/components/user-module/UserNew";
import { allUsers } from "@/services/actions/userService";
import type { User } from "@/services/service-types";

export default function ViewAdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialLoad) {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const fetchedUsers = await allUsers();
          setUsers(fetchedUsers);
        } catch (err) {
          console.error("Failed to load users", err);
        } finally {
          setLoading(false);
          setInitialLoad(false);
        }
      };
      fetchUsers();
    }
  }, [initialLoad]);

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
  };

  const actionButtons = [
    <Button
      key="add-user"
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={() => setIsDialogOpen(true)}
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
        onSuccess={handleSuccess}
        initialUsers={users}
        onUsersUpdated={setUsers}
        loading={loading}
        setLoading={setLoading}
      />
    </AdminLayout>
  );
}