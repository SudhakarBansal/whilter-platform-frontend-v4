"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordModalProps = {
  setShowPasswordModal: (value: boolean) => void;
  showPasswordModal: boolean;
};

export function ChangePasswordModal({
  setShowPasswordModal,
  showPasswordModal,
}: ChangePasswordModalProps) {
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordForm) => {
    setPasswordLoading(true);

    setTimeout(() => {
      setPasswordLoading(false);
      setShowPasswordModal(false);
      reset();
      //  Show toast/notification here with `data`
      console.log("Password Changed:", data);
    }, 1200);
  };

  return (
    <Dialog
      open={showPasswordModal}
      onClose={() => setShowPasswordModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className="text-gray-800 font-semibold text-lg">
        Change Password
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Current Password"
            type="password"
            {...register("oldPassword", {
              required: "Current password is required",
            })}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
          />
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button
            onClick={() => {
              setShowPasswordModal(false);
              reset();
            }}
            type="button"
            variant="outlinePrimary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="flatPrimary"
            color="primary"
            disabled={passwordLoading}
          >
            {passwordLoading ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
