"use client";
import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Switch,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import {
  TextFieldElement,
  SelectElement,
  SelectElementWithIcon,
  PasswordElement,
  MultiSelectElement,
  FormContainer,
} from "@whilter/forms";
import { type OptionType, type OrganizationType } from "../page";

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

        <DialogTitle className="text-center pt-2 pb-4" sx={{ color: "white" }}>
          <Typography variant="h5" className="font-semibold text-white">
            {isEdit ? "Edit User" : "Register New User"}
          </Typography>
          <Typography variant="body2" className="text-blue-100 mt-2">
            {isEdit
              ? "Update the user details below."
              : "Fill in the details below to create a new user account."}
          </Typography>
        </DialogTitle>

        <DialogContent className="px-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Box>
                <TextFieldElement
                  name="name"
                  fullWidth
                  variant="outlined"
                  placeholder="John Smith"
                  size="small"
                  autoComplete="off"
                  required
                  label="Full Name"
                />
              </Box>

              <Box>
                <TextFieldElement
                  name="email"
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  placeholder="john.smith@gmail.com"
                  size="small"
                  autoComplete="off"
                  required
                />
              </Box>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <SelectElementWithIcon
                  name="organizationName"
                  options={organizationOptions1}
                  valueKey="id"
                  label="Select Organization"
                  renderOption={(item: { id: string; label: string; logoUrl?: string }, selected: boolean) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          alt=""
                          width={20}
                          height={20}
                          style={{ marginRight: 8, opacity: selected ? 1 : 0.6 }}
                        />
                      ) : (
                        <span style={{ marginRight: 8 }}>🖼️</span>
                      )}
                      <span>{item.label}</span>
                    </div>
                  )}
                  renderValue={(selected) => {
                    if (!selected) return null

                    if (typeof selected === "string" || typeof selected === "number") {
                      return <span style={{ fontWeight: "bold" }}>{selected}</span>
                    }

                    if (typeof selected === "object" && "label" in selected) {
                      return <span style={{ fontWeight: "bold" }}>{selected.label}</span>
                    }

                    return null
                  }}
                />

              </Box>


              <Box>
                <SelectElement
                  name="role"
                  options={roleOptions1}
                  fullWidth
                  size="small"
                  label="Select Role"
                />
              </Box>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isEdit && (
                <Box>
                  <PasswordElement
                    name="password"
                    label="Password"
                    required
                    fullWidth
                    placeholder="••••••••••••••••••"
                  />
                </Box>
              )}
              <Box>
                <MultiSelectElement
                  name="preferredSections"
                  options={preferredSectionOptions}
                  fullWidth
                  size="small"
                  label="Select Section"
                  showChips={true}
                />
              </Box>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <Typography>Account Status</Typography>
                <Controller
                  name="status"
                  control={methods.control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between rounded border border-white/30 px-3 py-1 bg-white/5">
                      <span className="text-white text-sm">
                        {field.value ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </div>
                  )}
                />
              </Box>

              <Box>
                <Typography>Organization Access</Typography>
                <Controller
                  name="orgLevelAccess"
                  control={methods.control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between rounded border border-white/30 px-3 py-1 bg-white/5">
                      <span className="text-white text-sm">
                        {field.value ? "Active" : "Inactive"}
                      </span>
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#ffffff",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#3b82f6",
                          },
                        }}
                      />
                    </div>
                  )}
                />
              </Box>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outlinePrimary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="flatPrimary">
                {isEdit ? "Update" : "Register"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </FormContainer>
  );
};

export default UserForm;
