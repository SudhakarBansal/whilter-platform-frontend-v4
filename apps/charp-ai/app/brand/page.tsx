import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";

 export default function CreateBrandPage () {

      const breadcrumbs = buildBreadcrumbs([
        { label: "Dashboard", href: "/" },
        { label: "Brand", href: "/brand" },
      ]);
  return (

    <DashboardLayout
        breadcrumbs={breadcrumbs}
        heading="Campaigns of Dominos Pizza"
        description="Choose campaign to view details"
        config={pageLayoutPresets.dashboard}
   >
      </DashboardLayout>
  );
}