"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import AdminLayout from "@/layouts/admin-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { OrganizationForm } from "../../components/organization-form";

export default function NewOrganizationPage() {
  const router = useRouter();

  const breadcrumbs = buildBreadcrumbs([
    { label: "Organization", href: "/organization" },
    { label: "Edit Organization", href: "/organization/edit" },
  ]);

  const handleCancel = () => {
    router.back();
  };

  const handleSuccess = () => {
    // Handle successful organization creation
    // Could redirect or show success message
    router.push("/organization");
  };

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      heading="Edit Organization"
      description="Edit the new organization"
      config={pageLayoutPresets.dashboard}
    >
      <OrganizationForm onCancel={handleCancel} onSuccess={handleSuccess} isEditing={true} />
    </AdminLayout>
  );
}
