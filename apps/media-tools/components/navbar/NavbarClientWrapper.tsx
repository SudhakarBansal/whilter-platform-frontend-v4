"use client";

import { Navbar } from "@whilter/shared-layouts/navbar";
import { useRouter } from "next/navigation";

export function NavbarClientWrapper({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Navbar
      onMangeUsers={(path) => router.push(path)}
      onNavigate={(path) => router.push(path)}
      user={user}
    >
      {children}
    </Navbar>
  );
}
