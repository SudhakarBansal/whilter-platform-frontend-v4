import { axiosInstance } from '../../axios/axiosInstance';
import  type {
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  LoginPayload,
  LogoutPayload
} from './auth.types';
import { ServiceEndpoints } from './serviceEndpoints';
import type { AxiosResponse } from 'axios';
import type {CharpErrorCode} from '@whilter/shared-types'
import {CHARP_ERROR_CODES} from '@whilter/shared-types'
import {CharpErrorDetail} from '@whilter/shared-types'


export async function login(data: LoginPayload): Promise<AxiosResponse<any>> {
  try {
    const response = await axiosInstance.post(ServiceEndpoints.login, data);

    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw new Error("Login failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error logging in user:", errorResponse);
    throw new Error(errorResponse);
  }
}


export async function signup(data: SignupPayload): Promise<AxiosResponse<any>>{
  try {
    const response = await axiosInstance.post(ServiceEndpoints.signup, data);
    if (response.status === 200) {
      return response;
    }
    throw new Error("Registered failed.");
  } catch (error: any) {
    const errorResponse = error?.response?.data || "An unexpected error occurred";
    console.error("Error register user:", errorResponse);
    throw new Error(errorResponse);
  }
}

export async function forgotPassword(data: ForgotPasswordPayload): Promise<{ status: number; message: string }> {
    try {
      await axiosInstance.post(ServiceEndpoints.forgotPassword, data);
      return {
        status: 200,
        message: 'Password reset link sent successfully.',
      };
    } catch (error: any) {
      const errorMsg = error?.response?.data || 'An error occurred during password reset.';
      throw new Error(errorMsg);
    }
  }

export async function resetPassword(data: ResetPasswordPayload): Promise<{ status: number; message: string }> {
    try {
      await axiosInstance.post(ServiceEndpoints.resetPassword, data);
      return {
        status: 200,
        message: 'Password has been reset successfully.',
      };
    } catch (error: any) {
      const errorMsg = error?.response?.data || 'Reset password failed.';
      throw new Error(errorMsg);
    }
  }

export async function refreshToken(): Promise<{ status: number; token?: string }> {
    try {
      const response = await axiosInstance.post(ServiceEndpoints.refreshToken);
      return {
        status: 200,
        token: response.data?.token,
      };
    } catch (error: any) {
      return {
        status: error?.response?.status || 500,
      };
    }
  }

export async function logout(data: LogoutPayload): Promise<AxiosResponse<any>> {
  try {
    const response = await axiosInstance.post(ServiceEndpoints.logout, data);
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    throw new Error("Logout failed.");
  } catch (error: any) {
    const errorData = error?.response?.data;

    const code: CharpErrorCode = errorData?.code;
    const mappedError: CharpErrorDetail = CHARP_ERROR_CODES[code] ?? {
      code: "CHARP-1502",
      status: 500,
      message: "An unexpected error occurred during logout",
    };
    throw mappedError;
  }
}

