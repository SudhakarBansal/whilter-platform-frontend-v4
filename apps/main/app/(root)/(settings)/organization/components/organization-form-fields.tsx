import React from "react";
import { Stack } from "@mui/material";
import { TextFieldElement } from "@whilter/forms";

export function OrganizationFormFields() {
  return (
    <Stack spacing={3}>
      <TextFieldElement
        name="name"
        label="Organization Name"
        placeholder="Enter a Valid Organization Name"
        required
        autoFocus
        autoComplete="off"
      />

      <TextFieldElement
        name="description"
        label="Organization Description"
        placeholder="Enter description"
        autoComplete="off"
        multiline
        rows={4}
      />
    </Stack>
  );
}
