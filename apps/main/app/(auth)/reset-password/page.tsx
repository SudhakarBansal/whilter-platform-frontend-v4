"use client";

import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPassword";

export default function ResetPasswordPage() {
  function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
