
import axios from '../axios/axiosInstance';
import {
  LoginPayload,
  SignupPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  CreateUserPayload,
  getUserPermissions
} from '../types/auth.types';
import { ServiceEndpoints } from './authServiceType';

export const authService = {
  login: (data: LoginPayload) => axios.post(ServiceEndpoints.login, data),
  getUserPermissions: (data: getUserPermissions) => axios.post(ServiceEndpoints.getUserPermissions, data),
  signup: (data: SignupPayload) => axios.post(ServiceEndpoints.signup, data),
  refreshToken: () => axios.post(ServiceEndpoints.refreshToken),
  forgotPassword: (data: ForgotPasswordPayload) => axios.post(ServiceEndpoints.forgotPassword, data),
  resetPassword: (data: ResetPasswordPayload) => axios.post(ServiceEndpoints.resetPassword, data),
  createUser: (user: CreateUserPayload) => axios.post(ServiceEndpoints.createUser, user),
  assignRole: (userId: string, role: string) => axios.post(ServiceEndpoints.assignRole, { userId, role }),
};
