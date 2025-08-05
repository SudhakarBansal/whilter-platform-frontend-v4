"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TextField, MenuItem, FormControlLabel, Switch, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

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
    const [selectedRole,setSelectedRole] = useState<string | null>(null);
    const [selectedOrganization,setSelectedOrganization] = useState<string | null>(null);
    const router = useRouter();
    
  const handleChange = (
    field: keyof UserFiltersState,
    value: string | boolean
  ) => {
    // onFilterChange({ [field]: value });
  };

  useEffect(()=>{
    const role = searchParams.get("role");
    const organizationName = searchParams.get("organizationName");
    setSelectedRole(role);
    setSelectedOrganization(organizationName);
  },[searchParams]);

  useEffect(()=>{
    const params = new URLSearchParams(searchParams);
    if(selectedRole) params.set("role",selectedRole);
    else params.delete("role");
    if(selectedOrganization) params.set("organizationName",selectedOrganization);
    else params.delete("organizationName");
    router.replace(`/user-management?${params.toString()}`);
    
  },[selectedRole,selectedOrganization]);

  return (
    <Grid container spacing={2} className="mb-6">
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Email"
          // value={filters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Organization"
          // value={filters.organizationName}
          onChange={(e) => handleChange("organizationName", e.target.value)}
          fullWidth
        />
      </Grid>
 
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Role"
          // value={filters.role}
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
          // value={filters.preferredSection}
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
              // checked={filters.status}
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
