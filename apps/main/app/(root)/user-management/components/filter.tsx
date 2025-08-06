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

export type UserFiltersState = {
  status: boolean;
  email: string;
  organizationName: string;
  role: string;
  preferredSection: string;
};

interface Props {
  filters: UserFiltersState;
  onFilterChange: (filters: Partial<UserFiltersState>) => void;
}

const roles = ["Admin", "Manager", "User"];
const sections = ["Finance", "HR", "IT"];

export const UserFilters: React.FC<Props> = () => {
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
    setLocalFilters((prev) => ({
      ...prev,
      email: searchParams.get("email") || "",
      organizationName: searchParams.get("organizationName") || "",
      role: searchParams.get("role") || "",
      preferredSection: searchParams.get("preferredSection") || "",
      status: searchParams.get("status") === "true",
    }));
  }, []);

  const updateURL = useCallback(
    debounce((updatedFilters: Partial<UserFiltersState>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined || value === false) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.replace(`/user-management?${params.toString()}`);
    }, 500),
    [searchParams, router]
  );

  const handleChange = (field: keyof UserFiltersState, value: string | boolean) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
   
    updateURL({ [field]: value });
  };

  return (
    <Grid container spacing={2} className="mb-6">
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Email"
          value={localFilters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Organization"
          value={localFilters.organizationName}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Role"
          value={localFilters.role}
          onChange={(e) => handleChange("role", e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

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
            <MenuItem key={section} value={section}>
              {section}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

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
