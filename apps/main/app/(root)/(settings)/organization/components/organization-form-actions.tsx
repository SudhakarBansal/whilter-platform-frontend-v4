import React from "react";
import { Stack, Button } from "@mui/material";

interface OrganizationFormActionsProps {
  loading: boolean;
  onCancel: () => void;
  isEditing?: boolean;
}

export function OrganizationFormActions({
  loading,
  onCancel,
  isEditing = false,
}: OrganizationFormActionsProps) {
  return (
    <Stack className=" mt-4 flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-4">
      <Button
        onClick={onCancel}
        variant="outlineSecondary"
        sx={{ flex: 1 }}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        sx={{ flex: 1 }}
      >
        {loading
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
            ? "Update Organization"
            : "Create Organization"}
      </Button>
    </Stack>
  );
}
