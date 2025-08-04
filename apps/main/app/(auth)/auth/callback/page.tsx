"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { googleLogin } from "@whilter/api";

export default function GoogleCallbackPage() {
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
    return <p className="text-center mt-10 text-red-500">Missing authorization code.</p>;
  }

  return submitting ? (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700 font-medium">Logging you in...</p>
    </div>
  ) : null;


  /*
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Complete Your Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="GUEST">Guest</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Section
            </label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="e.g., Marketing"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
              submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Submitting..." : "Complete Login"}
          </button>
        </div>
      </div>
    </div>
  );
  */
}
