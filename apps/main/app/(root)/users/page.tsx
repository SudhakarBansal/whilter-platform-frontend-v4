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
import { getPaginatedUsersWithFilters } from "@/services/actions/userService";

export default function ViewAdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string>();
  const [users,setUsers] = useState([]);


  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
    setIsDialogOpen(true);
  };

  const handleAddUser = () => {
    setEditingUserId(undefined);
    setIsDialogOpen(true);
  };



  const breadcrumbs = buildBreadcrumbs([
    { label: "User", href: "/users" },
  ]);

  const handleSuccess = () => {
    setIsDialogOpen(false)
  }

    const fetchUsers = async (pagination:any,filters:any) => {
      try {
        // setLoading(true);
        const response = await getPaginatedUsersWithFilters({
          page: pagination.page,
          size: pagination.size,
          ...filters,
        });
        if(response){
        
          return response;
        }
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        
      }
    };

    const actionButtons = [
      <UserActionButton
        userId={editingUserId}
        fetchUsers={fetchUsers}
      />
    ];
    
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
        fetchUsers={fetchUsers}
        users={users}
        setUsers={setUsers}
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