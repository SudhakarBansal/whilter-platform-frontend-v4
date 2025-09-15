import "@whilter/ui-kit/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { MainLayout } from "@whilter/shared-layouts/main";
import { getSession } from "@whilter/auth";
import { NavbarClientWrapper } from "@/components/navbar/NavbarClientWrapper";
import NavbarContent from "@/components/navbar/NavbarContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media Tools",
  description: "Whilter Media Tools - Explore and Discover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log("Session in layout:", session);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeConfig>
          <NavbarClientWrapper user={session}>
            <NavbarContent />
          </NavbarClientWrapper>
          <MainLayout>{children}</MainLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
