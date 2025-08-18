"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import debounce from "lodash.debounce";
import { type UserActionButtonProps } from "../page";

export type UserFiltersState = {
  status: boolean;
  email: string;
  organizationName: string;
  role: string;
  preferredSection: string;
};

export type UserFiltersProps = {
  organizationList: { id: string; label: string }[];
  rolesList: { id: string; label: string }[];
};


const sections = [
  { id: "MEDIA_TOOLS", label: "Media Tools" },
  { id: "CHARP_AI", label: "Charp AI" },
  { id: "MARKETPLACE", label: "Marketplace" },
  { id: "DASHBOARD", label: "Dashboard" },
];

export const UserFilters = ({
  organizationList,
  rolesList,
}: UserFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [localFilters, setLocalFilters] = useState<UserFiltersState>({
    email: "",
    organizationName: "",
    role: "",
    preferredSection: "",
    status: false,
  });

  useEffect(() => {
    setLocalFilters({
      email: searchParams.get("email") || "",
      organizationName: searchParams.get("organizationName") || "",
      role: searchParams.get("role") || "",
      preferredSection: searchParams.get("preferredSection") || "",
      status: searchParams.get("status") === "true",
    });
  }, [searchParams]);

  const updateURL = useCallback(
    debounce((updatedFilters: Partial<UserFiltersState>) => {
      const currentParams = new URLSearchParams(window.location.search);
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          value === false
        ) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, String(value));
        }
      });
      router.push(`/user-management?${currentParams.toString()}`);
    }, 500),
    [router],
  );

  const handleChange = (
    field: keyof UserFiltersState,
    value: string | boolean,
  ) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
    updateURL({ [field]: value });
  };

  return (
    <Grid container spacing={2} className="mb-6">
      {/* Email */}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Email"
          value={localFilters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Organization */}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Organization"
          value={localFilters.organizationName}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {organizationList.map((org) => (
            <MenuItem key={org.id} value={org.label}>
              {org.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Role */}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Role"
          value={localFilters.role}
          onChange={(e) => handleChange("role", e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {rolesList.map((role) => (
            <MenuItem key={role.id} value={role.label}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Preferred Section */}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Preferred Section"
          value={localFilters.preferredSection}
          onChange={(e) => handleChange("preferredSection", e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.label}>
              {section.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Status */}
      <Grid item xs={12} sm={6} md={3}>
        <FormControlLabel
          control={
            <Switch
              checked={localFilters.status}
              onChange={(e) => handleChange("status", e.target.checked)}
              color="primary"
            />
          }
          label="Status: Active"
        />
      </Grid>
    </Grid>
  );
};
