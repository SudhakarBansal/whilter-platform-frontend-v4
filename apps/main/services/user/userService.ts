import {axiosInstance} from "@whilter/api"
import { ServiceEndpoints } from "./serviceEndpoints";
import type { RegisterCredentials,User } from "./user.types";

export async function allUsers(): Promise<User[]> {
  try {
    const response = await axiosInstance.get(ServiceEndpoints.allUsers);
    return response.data;
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error fetching users:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function registerUser(data: RegisterCredentials): Promise<string> {
  try {
    const response = await axiosInstance.post(ServiceEndpoints.createUser, data);
    if (response.status === 200) {
      return "User registered successfully!";
    }
    throw new Error("Registration failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error registering user:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function deleteUser(baseUrl: string, userEmail: string) {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/user?email=${userEmail}`);
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

export async function getOrganizationList(baseUrl: string) {
  try {
    const response = await axiosInstance.get(`${baseUrl}/auth/user/org`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    throw new Error(errorResponse);
  }
  finally{
    return "response"
  }
};

 