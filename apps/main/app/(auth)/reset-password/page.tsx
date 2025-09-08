"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import { resetPassword } from "@whilter/api";
import { useSearchParams } from "next/navigation";
import type { ResetPasswordPayload } from "@whilter/api/src/services/auth/auth.types";

type ResetForm = ResetPasswordPayload & {
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ResetForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Reset token is missing.");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      const response = await resetPassword({
        ...payload,
        token,
      });

      if (response) {
        router.push("/login");
        toast.success("Password reset successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          String(error) ||
          "Error occurred while resetting password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Reset Password
      </h1>
      <p className="text-gray-600 text-sm mb-6">
        Enter the reset code you received via email and set a new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* New Password Field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          {/* <Button
            type="button"
            variant="outlinePrimary"
            onClick={() => router.back()}
          >
            Back
          </Button> */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#324e9f] hover:bg-[#1C3074] text-white px-6 py-2 rounded-md"
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
