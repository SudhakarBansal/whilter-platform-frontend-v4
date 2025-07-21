import axios from '../axiosInstance'
import {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  CreateUserPayload,
  getUserPermissions
} from '../types/auth.types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_AUTH_URL,
});

export const authService = {
  login: (data: LoginPayload) =>
    api.post('/api/user/login', data),

  getUserPermissions: (data: getUserPermissions) =>
    api.post('/auth/permissions', data),

  signup: (data: SignupPayload) =>
    api.post('/auth/signup', data),

  refreshToken: () =>
    api.post('/auth/refresh-token'),

  forgotPassword: (data: ForgotPasswordPayload) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordPayload) =>
    api.post('/auth/reset-password', data),

  createUser: (user: CreateUserPayload) =>
    api.post('/admin/create-user', user),

  assignRole: (userId: string, role: string) =>
    api.post('/admin/assign-role', { userId, role }),
};
