'use client';

import { MainLayout } from '@whilter/shared-layouts/main';
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";

const inter = Inter({ subsets: ["latin"] });
export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeConfig>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
