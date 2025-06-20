import "@whilter/ui-kit/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeConfig } from "@whilter/config";
import { MainLayout} from "@whilter/ui-kit/shared-layouts"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media Tools",
  description: "Whilter Media Tools - Explore and Discover",
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
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeConfig>
      </body>
    </html>
  );
}
