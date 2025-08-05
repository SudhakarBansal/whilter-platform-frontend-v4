import {axiosInstance} from "@whilter/api"
import ServiceEndpoints from "../service-endpoints"
import type { RegisterCredentials,User,PaginatedUsersResponse, PaginatedFilterUsersResponse } from "../service-types"

export async function allUsers(): Promise<User[]> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.user.getUsers);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching users:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function getPaginatedUsers(page = 0, size = 10): Promise<PaginatedUsersResponse> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.user.getPaginatedUsers, {
      params: { page, size },
    });
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching paginated users:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function getPaginatedUsersWithFilters(
 params: {
  page?: number;
  size?: number;
  role?: string;
  status?: boolean;
  organizationName?: string;
  email?: string;
  preferredSection?: string;
}): Promise<PaginatedFilterUsersResponse> {
  console.log("params -- urdu",params);
  try {
    const response = await axiosInstance.get(ServiceEndpoints.user.paginatedUserWithFilter, {params:params});
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response || "An unexpected error occurred";
    console.error("Error fetching paginated users:", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function getUserById(id: string): Promise<User> {
  try {
    const response = await axiosInstance.get(`${ServiceEndpoints.user.getUserById}?id=${id}`);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching user by ID:", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function registerUser(data: RegisterCredentials): Promise<string> {
  try {
    const response = await axiosInstance.post(ServiceEndpoints.user.createUser, data);
    if (response.status === 200) {
      return "User registered successfully!";
    }
    throw new Error("Registration failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data?.message || "An unexpected error occurred";
    console.error("Error registering user:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function updateUser(email: string, data: Partial<RegisterCredentials>): Promise<string> {
  try {
    const response = await axiosInstance.put(`${ServiceEndpoints.user.updateUser}/${email}`, data);
    if (response.status === 200) {
      return "User updated successfully!";
    }
    throw new Error("Update failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data?.message || "An unexpected error occurred";
    console.error("Error updating user:", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function deleteUser(id: string) {
  try {
    const response = await axiosInstance.delete(`${ServiceEndpoints.user.deleteUser}/${id}`);
    if (response.status == 200) {
      return "User deleted successfully";
    };
  }
  catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.log("error -- 000", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function getRoleList() {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.user.getRole);
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


 