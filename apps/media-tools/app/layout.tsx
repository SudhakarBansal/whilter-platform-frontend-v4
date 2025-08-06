import "@whilter/ui-kit/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { Toaster } from "sonner";
import { MainLayout } from "@whilter/shared-layouts/main";
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import { NavbarClientWrapper } from "../components/navbar/NavbarClientWrapper";

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
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          toastOptions={{
            duration: 4000,
          }}
        />
        <ThemeConfig>
          <NavbarClientWrapper user={session}/>
            <MainLayout>{children}</MainLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
