"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login/LoginForm";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  );
}
