export interface BrandFormValues {
  brandName: string;
  brandLogo: string;
  referenceDoc: string;
}

export const brandFormInitialValues: BrandFormValues = {
  brandName: "",
  brandLogo: "",
  referenceDoc: "",
};

export type MediaType = "image" | "video";

export interface CampaignFormValues {
  campaignName: string;
  referenceDoc: string;
  mediaType: MediaType;
  width: string;
  height: string;
  aspectRatio:
    | "16:9"
    | "4:3"
    | "1:1"
    | "9:16"
    | "4:5"
    | "3:4"
    | "2:3"
    | "3:2"
    | "5:4"
    | "21:9";
  duration: number;
}

export const campaignFormInitialValues: CampaignFormValues = {
  campaignName: "",
  referenceDoc: "",
  mediaType: "image",
  width: "1920",
  height: "1080",
  aspectRatio: "16:9",
  duration: 0,
};
