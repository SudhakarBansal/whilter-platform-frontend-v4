export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  tokenType:string;
  deviceId:string
}

// Generic API Response Types
export interface ApiSuccessResponse<T = unknown> {
  status: number;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
}
