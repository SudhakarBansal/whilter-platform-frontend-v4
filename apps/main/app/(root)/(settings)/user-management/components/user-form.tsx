"use client";
import React, { useEffect } from "react";
import {
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import {
  FormContainer
} from "@whilter/forms";
import { type OptionType, type OrganizationType } from "../page";
import UserFormDialog from "./user-files/user-form-dialog";

interface UserFormProps {
  defaultValues: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
  organizationOptions: OrganizationType[];
  roleOptions: OptionType[];
  preferredSectionOptions: { id: string; label: string }[];
  isEdit: boolean;
}

const UserForm = ({
  defaultValues,
  onSubmit,
  onClose,
  organizationOptions,
  roleOptions,
  isEdit = false,
  preferredSectionOptions,
}: UserFormProps) => {
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  const organizationOptions1 = organizationOptions.map((org: OrganizationType) => ({
    id: org.name,
    label: org.name,
    logoUrl: org.logoUrl,
  }));

  const roleOptions1 = roleOptions.map((role: OptionType) => ({
    id: role.name,
    label: role.name,
  }));

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  return (
    <FormContainer formContext={methods} onSuccess={handleSubmit}>
      <div className="relative p-6">
        <IconButton
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>

        <UserFormDialog
          isEdit={isEdit}
          onClose={onClose}
          organizationOptions={organizationOptions1}
          roleOptions={roleOptions1}
          preferredSectionOptions={preferredSectionOptions}
        />
      </div>
    </FormContainer>
  );
};

export default UserForm;
