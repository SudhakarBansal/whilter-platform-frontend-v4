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

export async function createOrganization(data: CreateOrganizationRequest): Promise<string> {
  try {
    const response = await axiosInstance.post(ServiceEndpoints.organization.createOrganization, data);
    if (response.status === 200) {
      return "Organization created successfully!";
    }
    throw new Error("Registration failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data?.message || "An unexpected error occurred";
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