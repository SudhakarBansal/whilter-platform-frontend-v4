import "@whilter/ui-kit/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { MainLayout } from "@whilter/shared-layouts/main";
import { NavbarClientWrapper } from "@/components/navbar/NavbarClientWrapper";
import { Sidebar } from "@whilter/shared-layouts/sidebar";
import NextLink from "next/link";
import NextImage from "next/image";
import { menuItems } from "../../data/menuItems.data";
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charp.ai",
  description: "Whilter Charp ai - Explore and Discover",
};

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}){
  const session = await getServerSession(authOptions);
  console.log("sesion",session)
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
          }} />
        <ThemeConfig>
         <NavbarClientWrapper user={session}>
            <MainLayout
              showSidebar={true}
              sidebarComponent={
                <Sidebar
                  menuItems={menuItems}
                  LinkComponent={NextLink}
                  ImageComponent={NextImage}
                />
              }
            >
              {children}
            </MainLayout>
          </NavbarClientWrapper>
        </ThemeConfig>
      </body>
    </html>
  );
}
