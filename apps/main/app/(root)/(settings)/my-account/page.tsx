"use client";

import React from "react";
 import AccountDetails from "./components/AccountDetails";
import AdminLayout from "@/layouts/admin-layout";
import { buildBreadcrumbs } from "@/utils/buildBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";

export default function AccountPage() {
    const breadcrumbs = buildBreadcrumbs([
        { label: "User", href: "/users" },
    ]);
    return (
        <AdminLayout
            breadcrumbs={breadcrumbs}
            heading="My Account Details"
            config={pageLayoutPresets.dashboard}
        >
            <AccountDetails/> 
        </AdminLayout>
    );
}
