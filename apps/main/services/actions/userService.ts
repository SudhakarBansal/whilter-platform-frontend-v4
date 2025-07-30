import {axiosInstance} from "@whilter/api"
import ServiceEndpoints from "../service-endpoints"
import type { RegisterCredentials,User } from "../service-types"

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

export async function getUserById(id: string): Promise<User> {
  try {
    const response = await axiosInstance.get(`${ServiceEndpoints.user}/${id}`);
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

export async function updateUser(id: string, data: Partial<RegisterCredentials>): Promise<string> {
  try {
    const response = await axiosInstance.put(`${ServiceEndpoints.user}/${id}`, data);
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
    const response = await axiosInstance.delete(`${ServiceEndpoints.user}/${id}`);
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


 