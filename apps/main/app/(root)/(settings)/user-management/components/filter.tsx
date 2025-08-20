"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import debounce from "lodash.debounce";
import Pagination from "./pagination";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export type UserFiltersState = {
  status: boolean;
  email: string;
  organizationName: string;
  role: string;
  preferredSection: string;
};

export type UserFiltersProps = {
  organizationList: { id: string; name: string }[];
  rolesList: { id: string; name: string }[];
  // totalPages: number;
  // totalItems: number;
  // itemsPerPage: number;
};

const sections = [
  { id: "MEDIA_TOOLS", label: "Media Tools" },
  { id: "CHARP_AI", label: "Charp AI" },
  { id: "MARKETPLACE", label: "Marketplace" },
  { id: "DASHBOARD", label: "Dashboard" },
];

export const UserFilters = ({ organizationList, rolesList }: UserFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [localFilters, setLocalFilters] = useState<UserFiltersState>({
    email: "",
    organizationName: "",
    role: "",
    preferredSection: "",
    status: true,
  });

  useEffect(() => {
    setLocalFilters({
      email: searchParams.get("email") || "",
      organizationName: searchParams.get("organizationName") || "",
      role: searchParams.get("role") || "",
      preferredSection: searchParams.get("preferredSection") || "",
      status: searchParams.get("status") !== "false",
    });
  }, [searchParams]);

  const updateURL = useCallback(
    debounce((updatedFilters: Partial<UserFiltersState>) => {
      const currentParams = new URLSearchParams(window.location.search);
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (
          value === "" ||
          value === null ||
          value === undefined
        ) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, String(value));
        }
      });
      router.replace(`/user-management?${currentParams.toString()}`);
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
    <div className="flex flex-wrap gap-3 items-center">

      <TextField
        label="Email"
        value={localFilters.email}
        onChange={(e) => handleChange("email", e.target.value)}
        size="small"
        className="w-full sm:w-56 md:w-60 lg:w-44 xl:w-48"
      />

      <TextField
        select
        label="Organization"
        value={localFilters.organizationName}
        onChange={(e) => handleChange("organizationName", e.target.value)}
        size="small"
        className="w-full sm:w-56 md:w-60 lg:w-44 xl:w-48"
        SelectProps={{
          IconComponent: ArrowDropDownIcon,
          sx: {
            "& .MuiSelect-icon": {
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        }}
      >
        <MenuItem value="">All</MenuItem>
        {organizationList.map((org) => (
          <MenuItem key={org.id} value={org.name}>
            {org.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Role */}
      <TextField
        select
        label="Role"
        value={localFilters.role}
        onChange={(e) => handleChange("role", e.target.value)}
        size="small"
        className="w-full sm:w-48 md:w-56 lg:w-40 xl:w-44"
        SelectProps={{
          IconComponent: ArrowDropDownIcon,
          sx: {
            "& .MuiSelect-icon": {
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        }}
      >
        <MenuItem value="">All</MenuItem>
        {rolesList.map((role) => (
          <MenuItem key={role.id} value={role.name}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Section"
        value={localFilters.preferredSection}
        onChange={(e) => handleChange("preferredSection", e.target.value)}
        size="small"
        className="w-full sm:w-48 md:w-56 lg:w-40 xl:w-44"
        SelectProps={{
          IconComponent: ArrowDropDownIcon,
          sx: {
            "& .MuiSelect-icon": {
              color: "rgba(255, 255, 255, 0.6)",
            },
          },
        }}
      >
        <MenuItem value="">All</MenuItem>
        {sections.map((section) => (
          <MenuItem key={section.id} value={section.id}>
            {section.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        label="Status"
        labelPlacement="start"
        control={
          <Switch
            checked={localFilters.status}
            onChange={(e) => handleChange("status", e.target.checked)}
          />
        }

      />
    </div>
  );
}
