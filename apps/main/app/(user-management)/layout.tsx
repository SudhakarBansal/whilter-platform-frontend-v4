'use client';

import { MainLayout } from '@whilter/shared-layouts/main';
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { NavbarLayout } from "@whilter/shared-layouts/navbar";
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { Sidebar } from "@whilter/shared-layouts/sidebar";
import { menuItems } from '@/utils/data/menuItems.data';
import NextLink from "next/link";
import NextImage from "next/image";

const inter = Inter({ subsets: ["latin"] });
export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  const router = useRouter();

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
          <NavbarLayout onSettings={(path) => (router.push(path))} >
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
        </NavbarLayout>
      </ThemeConfig>
    </body>
    </html >
  );
}
