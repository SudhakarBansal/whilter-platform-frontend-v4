'use client';

import { MainLayout } from '@whilter/shared-layouts/main';
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { useRouter } from 'next/navigation';
import { NavbarLayout } from "@whilter/shared-layouts/navbar";
import { Toaster } from 'sonner';

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
          <NavbarLayout onSettings={(path) =>(router.push(path))}>
          <MainLayout>
            {children}
          </MainLayout>
          </NavbarLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
