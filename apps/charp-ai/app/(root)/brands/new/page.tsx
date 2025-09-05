import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Add } from "@mui/icons-material";
import AddNewBrand from "../../../../components/brand-section/AddNewBrand";
export default function BrandListingPage(): JSX.Element {
  const handleDelete = () => {
    // Handle delete action here
  };
  const onClose = () => {
    // Handle close action here
  };
  const open = false; // Control the open state of the dialog
  return (
    <DashboardLayout
      heading="Add New Brand"
      description="Fill details to create a new brand"
      // breadcrumbs={breadcrumbs}

      //     config={pageLayoutPresets.dashboard}
      //     buttons={actionButtons}
    >
      <AddNewBrand />
    </DashboardLayout>
  );
}
