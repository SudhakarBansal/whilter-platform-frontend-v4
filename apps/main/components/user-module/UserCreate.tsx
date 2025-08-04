"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { FormContainer } from "@whilter/forms";
import { UserForm } from "./components/UserForm";
import { type UserFormValues, userFormInitialValues } from "@/model/userFormInitialValues";
import type { AddUserProps } from "@/types/addUser.types";
import { getOrganizationList } from "@/services/actions/organizationService";
import { getRoleList } from "@/services/actions/rolesServices";
import { toast } from "sonner";
import { Typography } from "@mui/material";

export const UserCreate = ({
  open,
  onClose,
  userId,
  handleSubmit,
  isEditMode = false,
  defaultValues,
}: AddUserProps) => {
  const [loading, setLoading] = useState(false);

  const [organizationOptions, setOrganizationOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const methods = useForm<UserFormValues>({
    defaultValues: defaultValues || userFormInitialValues,
  });

  const preferredSectionOptions = [
    { id: "MEDIA_TOOLS", label: "Media Tools" },
    { id: "CHARP_AI", label: "Charp AI" },
    { id: "MARKETPLACE", label: "Marketplace" },
    { id: "Dashboard", label: "Dashboard" },
  ];


  const fetchOptions = async () => {
    try {
      setLoading(true);

      const [orgs, roles] = await Promise.all([
        getOrganizationList(),
        getRoleList()
      ]);

      setOrganizationOptions(orgs.map((org: any) => ({
        id: org.name,
        label: org.name
      })));

      setRoleOptions(roles.map((role: any) => ({
        id: role.name,
        label: role.name
      })));

      if (defaultValues) {
        methods.reset(defaultValues);
      }
    } catch (err) {
      toast.error("Failed to load options");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchOptions();
    }

    if (defaultValues) {
      methods.reset(defaultValues);
    }

  }, [open, defaultValues]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      classes={{
        paper:
          "bg-gradient-to-br from-blue-600 to-blue-400 text-white max-w-[550px] w-full",
      }}
    >
      <FormContainer formContext={methods} onSuccess={handleSubmit}>
        <div className="relative p-6">
          <IconButton
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle className="text-center pt-2 pb-4" sx={{ color: "white" }}>
            <Typography variant="h5" className="font-semibold text-white">
              {isEditMode ? "Edit User" : "Register New User"}
            </Typography>
            <Typography variant="body2" className="text-blue-100 mt-2">
              {isEditMode
                ? "Update the user details below."
                : "Fill in the details below to create a new user account."}
            </Typography>
          </DialogTitle>

          <DialogContent className="px-0">
            <UserForm
              organizationOptions={organizationOptions}
              roleOptions={roleOptions}
              preferredSectionOptions={preferredSectionOptions}
              isEditMode={isEditMode}
              onClose={onClose}
            />
          </DialogContent>
        </div>
      </FormContainer>
    </Dialog>
  );
};