import axios from '../axiosInstance'
import {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  CreateUserPayload,
} from '../types/auth.types';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const authService = {
  loginWithEmail: (data: LoginPayload) =>
    api.post('/auth/login', data),

  signup: (data: SignupPayload) =>
    api.post('/auth/signup', data),

  forgotPassword: (data: ForgotPasswordPayload) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordPayload) =>
    api.post('/auth/reset-password', data),

  createUser: (user: CreateUserPayload) =>
    api.post('/admin/create-user', user),

  assignRole: (userId: string, role: string) =>
    api.post('/admin/assign-role', { userId, role }),
};
