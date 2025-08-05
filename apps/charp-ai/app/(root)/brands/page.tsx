"use client";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { Button ,Stack} from "@mui/material";
import { useRouter } from "next/navigation";
import { Plus } from 'lucide-react';
import { RecentProjects } from '@whilter/ui-kit/components'
import {recentCampaigns} from "../../../data/recentCampaigns.data";
import BrandsCardSection from "@/components/brand-section/BrandCardSection";


export default function ViewBrandPage() {
  const router = useRouter();

  const handleAddNewBrand = () => {
    router.push("/brands/new");
  };

  const actionButtons = [
    <Button
      key="view-campaign"
      startIcon={<Plus />}
      variant="glassmorphism"
      onClick={handleAddNewBrand}
    >
      Add New Brand
    </Button>,
  ];

  const breadcrumbs = buildBreadcrumbs([
    { label: "Dashboard", href: "/" },
    { label: "Brands", href: "/brands" },
  ]);

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      heading="Brand List"
      description="Choose Brand to manage campaigns"
      config={pageLayoutPresets.dashboard}
      buttons={actionButtons}
    >
      <BrandsCardSection onAddClick={handleAddNewBrand} />
      <RecentProjects data={recentCampaigns} label="Recent Campaigns" />
    </DashboardLayout>
  );
}
