import { axiosInstance } from "@whilter/api";
import ServiceEndpoints from "../service-endpoints";
import type { PaginatedFilterOrganizationResponse } from "../service-types";
import type { CreateOrganizationRequest, Organization } from "@/types/organization.types";

export async function allOrganization(): Promise<Organization[]> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.organization.getOrganization);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching organizations:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function getOrganizationList() {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.organization.getOrganization);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    throw new Error(errorResponse);
  }
}

// organizationService.ts
export async function createOrganization(data: CreateOrganizationRequest & { logoUrl: string | File | null }) {
  try {
    const headers: Record<string, string> = {};
    console.log("requestData", data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');

    if (data.logoUrl instanceof File) {
      formData.append('logo', data.logoUrl);
    } else {
      formData.append('logo', "");
    }
    const response = await axiosInstance.post(
      ServiceEndpoints.organization.createOrganization,
      formData,
      { headers }
    );

    if (response.status === 200 || response.status === 201) {
      return "Organization created successfully!";
    }
    throw new Error("Organization creation failed.");
  } catch (error: any) {
    console.error("Full error object:", error);
    const errorResponse = error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred";
    console.error("Error creating organization:", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function getPaginatedOrganizationWithFilters(
  params: {
    page?: number;
    size?: number;
    name?: string;
  }): Promise<PaginatedFilterOrganizationResponse> {
  console.log("params --organization", params);
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axiosInstance.get(ServiceEndpoints.organization.paginatedOrganizatoinWithFilter, { params: params });
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response || "An unexpected error occurred";
    console.error("Error fetching paginated organizations:", errorResponse);
    throw new Error(errorResponse);
  }
}