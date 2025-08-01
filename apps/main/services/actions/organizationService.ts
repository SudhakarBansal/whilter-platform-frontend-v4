import { axiosInstance } from "@whilter/api";
import ServiceEndpoints from "../service-endpoints";
import type { Organization } from "../service-types";

export async function allOrganization(): Promise<Organization[]> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.organization.getOrganization);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching users:", errorResponse);
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