import { axiosInstance } from '../../axios/axiosInstance';
import {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  CreateUserPayload,
  LoginResponse,
} from '../../types/auth.types';
import { ServiceEndpoints } from './serviceType';

export const authService = {
  
  async login(data: LoginPayload): Promise<{ status: number; data: LoginResponse }> {
    try {
      const response = await axiosInstance.post(ServiceEndpoints.login, data);
      const responseData = response.data;
      return {
        status: 200,
        data: {
          ...responseData,
          isAuthenticated: true,
        },
      };
    } catch (error: any) {
      return {
        status: error?.response?.status || 500,
        data: { isAuthenticated: false },
      };
    }
    finally{
    }
  },

  async signup(data: SignupPayload): Promise<{ status: number; message: string }> {
    try {
      const response = await axiosInstance.post(ServiceEndpoints.signup, data);
      return {
        status: 200,
        message: 'User registered successfully!',
      };
    } catch (error: any) {
      const errorMsg = error?.response?.data || 'An unexpected error occurred';
      throw new Error(errorMsg);
    }
  },

  async forgotPassword(data: ForgotPasswordPayload): Promise<{ status: number; message: string }> {
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
  },

  async resetPassword(data: ResetPasswordPayload): Promise<{ status: number; message: string }> {
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
  },

  async refreshToken(): Promise<{ status: number; token?: string }> {
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
  }, 
};
