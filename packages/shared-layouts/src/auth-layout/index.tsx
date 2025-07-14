
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white">
        {children}
    </div>
  );
}
