// components/user-module/UserForm.tsx
"use client";
import React from "react";
import { Box, Typography, Switch, Button } from "@mui/material";
import { Controller } from "react-hook-form";
import {
  TextFieldElement,
  SelectElement,
  PasswordElement,
  MultiSelectElement,
} from "@whilter/forms";

interface UserFormProps {
  organizationOptions: { label: string; value: string }[];
  roleOptions: { label: string; value: string }[];
  preferredSectionOptions: { id: string; label: string }[];
  isEditMode?: boolean;
  onClose: () => void;
}

export const UserForm = ({
  organizationOptions,
  roleOptions,
  preferredSectionOptions,
  isEditMode = false,
  onClose
}: UserFormProps) => {
  return (
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
          <SelectElement
            name="organizationName"
            options={organizationOptions}
            fullWidth
            size="small"
            label="Select Organization"
          />
        </Box>
        <Box>
          <SelectElement
            name="role"
            options={roleOptions}
            fullWidth
            size="small"
            label="Select Role"
          />
        </Box>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isEditMode && (
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

        <Box>
          <Typography>Organization Access</Typography>
          <Controller
            name="orgLevelAccess"
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
          {isEditMode ? "Update" : "Register"}
        </Button>
      </div>
    </div>
  );
};