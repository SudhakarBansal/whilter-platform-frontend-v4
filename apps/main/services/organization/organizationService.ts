import { axiosInstance } from "@whilter/api";
import { ServiceEndpoints } from "./serviceEndpoints";
import type { Organization } from "./organization.types";

export async function allOrganization(): Promise<Organization[]> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.getOrganization);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching users:", errorResponse);
    throw new Error(errorResponse);
  }
}