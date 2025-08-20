"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import debounce from "lodash.debounce";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export type UserFiltersState = {
  status: boolean;
  email: string;
  organizationName: string;
  role: string;
  preferredSection: string;
};

export type UserFiltersProps = {
  organizationList: { id: string; name: string, logoUrl: string }[];
  rolesList: { id: string; name: string }[];
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
        if (!value) {
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
          renderValue: (selected) => {
            if (!selected) return "All";
            return selected as string;
          },
        }}
      >
        <MenuItem value="">
          Null
        </MenuItem>
        {organizationList.map((org) => (
          <MenuItem key={org.id} value={org.name}>
            <div className="flex items-center gap-2">
              {org.logoUrl && (
                <img
                  src={org.logoUrl}
                  alt={org.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
              )}
              <span>{org.name}</span>
            </div>
          </MenuItem>
        ))}
      </TextField>


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
        <MenuItem value="">NULL</MenuItem>
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
        <MenuItem value="">Null</MenuItem>
        {sections.map((section) => (
          <MenuItem key={section.id} value={section.id}>
            {section.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        label="Status"
        labelPlacement="start"
        sx={{
          '& .MuiSwitch-track': {
            border: '1px solid white',
            borderRadius: '20px',
          }
        }}
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
