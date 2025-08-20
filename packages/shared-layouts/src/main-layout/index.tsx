import type { ReactNode } from "react";
import "@whilter/ui-kit/globals.css";
import ThemedLayout from "../ThemedLayout/ThemedLayout";
import { Toaster } from "sonner";

export function MainLayout({ children }: { children: ReactNode }) {
   return (
    <div className="flex min-h-screen">
      <ThemedLayout>{children}</ThemedLayout>
      <Toaster
        position="top-right"
        expand={true}
        richColors={true}
        closeButton={true}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
}

