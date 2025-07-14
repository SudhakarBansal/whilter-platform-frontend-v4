
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white">
      <div className="bg-white text-gray-900 w-full max-w-md p-8 rounded-xl shadow-xl">
        <div className="mb-6 text-center">
          <img src="/logo.svg" className="w-20 h-20 mx-auto" />
          <h2 className="text-2xl font-bold">Welcome to Whilter</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
