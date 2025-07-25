"use client";
import { useState } from "react";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { Plus } from 'lucide-react';
import { UserCardSection } from "@/components/user-listing-cards/UserCardSection";
import { AddUser } from '@/components/user-listing-cards/AddUser'

export default function ViewAdminPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const handleAddNewUser = () => {
    setIsAddUserOpen(true)
  }

  const handleCloseAddUser = () => {
    setIsAddUserOpen(false)
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
      <UserCardSection />
      <AddUser open={isAddUserOpen} onClose={handleCloseAddUser} />
    </AdminLayout>
  );
}