import "@whilter/ui-kit/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { MainLayout } from "@whilter/shared-layouts/main";
import { Navbar } from "@whilter/shared-layouts/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Whilter Marketplace - Explore and Discover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeConfig>
          <Navbar/>
          <MainLayout>{children}</MainLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
