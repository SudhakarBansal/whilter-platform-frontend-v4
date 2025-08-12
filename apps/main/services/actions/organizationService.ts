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
    const response = {
      data: {
        content: [
          {
            id: "1", // Changed from number to string
            name: "Acme Corp",
            description:
              "Acme Corp specializes in innovative technologrvices worldwide.",
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=center",
          },
          {
            id: "2", // Changed from number to string
            name: "Tech Solutions",
            description: "Tech Solutions helps businigration, and automation services.",
            logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=80&h=80&fit=crop&crop=center",
          },
          {
            id: "3", // Changed from number to string
            name: "Innovation Labs",
            description:
              "Innovd emerging technologies to drive the future of business.",
            logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=80&h=80&fit=crop&crop=center",
          }
        ],
        pageable: {
          pageNumber: 0,
          pageSize: params.size ?? 0,
          sort: {
            sorted: false,
            empty: true,
            unsorted: true
          },
          offset: 0,
          paged: true,
          unpaged: false
        },
        totalPages: 1, // Updated to be more realistic
        totalElements: 3, // Updated to match content length
        size: 5,
        number: 0,
        sort: {
          sorted: false,
          empty: true,
          unsorted: true
        },
        first: true,
        last: true,
        numberOfElements: 5, // Updated to match content length
        empty: false // Updated since we have content
      }
    };
    // const response = await axiosInstance.get(ServiceEndpoints.organization.paginatedOrganizatoinWithFilter, { params: params });
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response || "An unexpected error occurred";
    console.error("Error fetching paginated organizations:", errorResponse);
    throw new Error(errorResponse);
  }
}