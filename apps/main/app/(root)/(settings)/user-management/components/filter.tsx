"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField, MenuItem } from "@mui/material";
import debounce from "lodash.debounce";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export type UserFiltersState = {
  status: "" | "true" | "false";
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

const statusOptions = [
  { id: "true", label: "Active" },
  { id: "false", label: "Inactive" },
];

export const UserFilters = ({ organizationList, rolesList }: UserFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [localFilters, setLocalFilters] = useState<UserFiltersState>({
    email: "",
    organizationName: "",
    role: "",
    preferredSection: "",
    status: "",
  });

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const status = statusParam === "true" || statusParam === "false" ? statusParam : "";
    setLocalFilters({
      email: searchParams.get("email") || "",
      organizationName: searchParams.get("organizationName") || "",
      role: searchParams.get("role") || "",
      preferredSection: searchParams.get("preferredSection") || "",
      status
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
          renderValue: (selected) => selected ? (selected as string) : <span>All</span>
        }}
      >
        <MenuItem value="">
          None
        </MenuItem>
        {organizationList.map((org) => (
          <MenuItem key={org.id} value={org.name}>
            <div className="flex items-center gap-2">
              {org.logoUrl ? (
                        <img
                          src={org.logoUrl}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-xs">
                          🖼️
                        </div>
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
        <MenuItem value="">None</MenuItem>
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
        <MenuItem value="">None</MenuItem>
        {sections.map((section) => (
          <MenuItem key={section.id} value={section.id}>
            {section.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Status"
        value={localFilters.status}
        onChange={(e) => handleChange("status", e.target.value)}
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
        <MenuItem value="">None</MenuItem>
        {statusOptions.map((status) => (
          <MenuItem key={status.id} value={status.id}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>

    </div>
  );
}
