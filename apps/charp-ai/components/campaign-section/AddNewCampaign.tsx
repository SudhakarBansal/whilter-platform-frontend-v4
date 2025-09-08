"use client";
import React from "react";
import { FormContainer } from "@whilter/forms";
import {
  campaignFormInitialValues,
  type CampaignFormValues,
  type MediaType,
} from "../../model/formInitialValues";
import { CampaignFormContent } from "./CampaignFormContent";

interface CampaignFormData extends CampaignFormValues {
  mediaType: MediaType;
}

interface AddNewCampaignProps {
  onSubmit?: (data: CampaignFormData) => void;
}

// ========== MAIN COMPONENT ==========
const AddNewCampaign: React.FC<AddNewCampaignProps> = ({ onSubmit }) => {
  const handleFormSubmit = (data: CampaignFormValues) => {
    if (onSubmit) {
      onSubmit(data as CampaignFormData);
    } else {
      console.log("Form submitted:", data);
    }
  };
  return (
    <div>
      <FormContainer<CampaignFormValues>
        defaultValues={campaignFormInitialValues}
        onSuccess={handleFormSubmit}
      >
        <CampaignFormContent />
      </FormContainer>
    </div>
  );
};

export default AddNewCampaign;
