"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { googleLogin } from "@whilter/api";

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const performLogin = async () => {
      setSubmitting(true);
      if (!code) return;
      try {
        const response = await googleLogin({
          googleIdToken: code,
        });

        const { accessToken, refreshToken, deviceId } = response?.data || {};
        const result = await signIn("credentials", {
          accessToken,
          refreshToken,
          deviceId,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/platform");
        } else {
          console.error("NextAuth signIn failed", result);
        }
      } catch (err) {
        console.error("Google login failed", err);
      } finally {
        setSubmitting(false);
      }
    };

    if (code) {
      performLogin();
    }
  }, [code, router]);

  if (!code) {
    return (
      <p className="text-center mt-10 text-red-500">
        Missing authorization code.
      </p>
    );
  }

  return submitting ? (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700 font-medium">Logging you in...</p>
    </div>
  ) : null;
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-gray-700 font-medium">Loading...</p>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
