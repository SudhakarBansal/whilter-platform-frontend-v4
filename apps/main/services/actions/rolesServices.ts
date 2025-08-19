import {axiosInstance} from "@whilter/api"
import ServiceEndpoints from "../service-endpoints"

export async function getRoleList() {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.user.getRole);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error: any) {
    const errorResponse = error?.response?.data?.message || "An unexpected error occurred";
    throw new Error(errorResponse);
  }
}