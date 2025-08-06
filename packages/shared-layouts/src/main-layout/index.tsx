import type { ReactNode } from "react";
import "@whilter/ui-kit/globals.css";
import ThemedLayout from "../ThemedLayout/ThemedLayout";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ThemedLayout>{children}</ThemedLayout>
    </div>
  );
}
