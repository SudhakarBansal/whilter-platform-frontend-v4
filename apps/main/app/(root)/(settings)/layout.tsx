// app/tools/layout.tsx (or wherever this layout lives)
import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { menuItems } from "@/app/data/menuItems.data";

import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import { Role } from "@whilter/auth";

export default async function UserMangementLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  const isSuperAdmin =
    role === (Role?.SUPER_ADMIN ?? "SUPER_ADMIN"); 

  return (
    <Box className="relative flex min-h-screen">
      <Sidebar menuItems={menuItems}/>
      <Box component="main" className="flex-1">
        {children}
      </Box>
    </Box>
  );
}

