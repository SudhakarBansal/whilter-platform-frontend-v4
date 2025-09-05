"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { forgotPassword } from "@whilter/api";
import type { ForgotPasswordPayload } from "@whilter/api/src/services/auth/auth.types";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>();

  const onSubmit = async (data: ForgotPasswordPayload) => {
    setLoading(true);

    // try {
    //   const response = await forgotPassword(data);

    //if (response) {
    // const token = response.data;

    //   if (token) {
    //     toast.success("Password reset link sent successfully");
    //     router.push(`/reset-password?token=${encodeURIComponent(token)}`);
    //   } else {
    //     toast.error("Token not found in response");
    //   }
    // }
    // } catch (error: any) {
    //   toast.error(
    //     error?.message ||
    //       String(error) ||
    //       "Error occurred while sending reset link"
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Forgot Password
      </h1>
      <p className="text-gray-600 text-sm mb-6">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/,
                message: "Please enter a valid email address.",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outlinePrimary"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#324e9f] hover:bg-[#1C3074] text-white px-6 py-2 rounded-md"
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Send Link"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
