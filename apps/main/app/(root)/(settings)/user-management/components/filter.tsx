"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import debounce from "lodash.debounce";
import Pagination from "./pagination";

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
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

const sections = [
  { id: "MEDIA_TOOLS", label: "Media Tools" },
  { id: "CHARP_AI", label: "Charp AI" },
  { id: "MARKETPLACE", label: "Marketplace" },
  { id: "DASHBOARD", label: "Dashboard" },
];

export const UserFilters = ({ organizationList, rolesList, totalPages, totalItems, itemsPerPage }: UserFiltersProps) => {
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
    <div className="flex items-center justify-between gap-4 mb-6">
      
      <div className="flex items-center gap-4 flex-wrap">
        <TextField
          label="Email"
          value={localFilters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          size="small"
          style={{ width: 160 }}
        />

        <TextField
          select
          label="Organization"
          value={localFilters.organizationName}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          size="small"
          style={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {organizationList.map((org) => (
            <MenuItem key={org.id} value={org.name}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Role"
          value={localFilters.role}
          onChange={(e) => handleChange("role", e.target.value)}
          size="small"
          style={{ width: 150 }}
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
          style={{ width: 160 }}
        >
          <MenuItem value="">All</MenuItem>
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              {section.label}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Switch
              checked={localFilters.status}
              onChange={(e) => handleChange("status", e.target.checked)}
              color="primary"
              size="small"
              sx={{
                '& .MuiSwitch-track': {
                  border: '1px solid white',
                  borderRadius: '20px',
                }
              }}
            />
          }
          label="Status"
          labelPlacement="start"
        />
      </div>


      <div className="flex-shrink-0 w-[240px]">
        <Pagination
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};
