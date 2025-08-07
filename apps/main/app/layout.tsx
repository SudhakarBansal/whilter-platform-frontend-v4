import "@whilter/ui-kit/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/service-cards/SessionWrapper";
import { ThemeConfig } from "@whilter/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
          expand={true}
          richColors={true}
          closeButton={true}
          toastOptions={{
            duration: 3000,
          }}
        />
        <SessionWrapper>
          <ThemeConfig>{children}</ThemeConfig>
        </SessionWrapper>
      </body>
    </html>
  );
}
