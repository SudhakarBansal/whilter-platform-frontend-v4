"use client"
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { TextFieldElement, FormContainer } from '@whilter/forms';
import { brandFormInitialValues,  type BrandFormValues } from "../../../data/formInitialValues";

export default function AddNewBrand(): JSX.Element {
  const handleSubmit = (data: BrandFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <FormContainer<BrandFormValues>
      defaultValues={brandFormInitialValues}
      onSuccess={handleSubmit}
    >
      <Box>
        <Typography>Brand Name</Typography>
        <TextFieldElement
          name="brandName"
          fullWidth
          variant="outlined"
          placeholder="Name your brand"
          size="small"
          autoComplete='off'
          required
        />
        
        <Typography sx={{ mt: 2 }}>Brand logo</Typography>
        <TextFieldElement
          name="brandLogo"
          fullWidth
          variant="outlined"
          placeholder="Add logo"
          size="small"
          autoComplete='off'
          required
        />
        
        <Typography sx={{ mt: 2 }}>Reference Document</Typography>
        <TextFieldElement
          name="referenceDoc"
          fullWidth
          variant="outlined"
          placeholder="Add reference document"
          size="small"
          autoComplete='off'
          required
        />
      </Box>
      
      <Box textAlign="center" mt={2}>
        <Button
          variant="flatPrimary"
          type="submit"
          size="medium"
        >
          Save and Continue
        </Button>
      </Box>
    </FormContainer>
  );
}