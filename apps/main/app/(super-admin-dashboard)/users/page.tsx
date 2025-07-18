"use client";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Plus } from 'lucide-react';
import { UserTableSection } from "@/components/user-listing-cards/UserTableSection"

export default function ViewAdminPage() {
  const router = useRouter();

  const handleAddNewUser = () => {
    router.push("/users/new");
  };

  const actionButtons = [
    <Button
      key="add-campaign"
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

      <UserTableSection />
    </AdminLayout>
  );
}