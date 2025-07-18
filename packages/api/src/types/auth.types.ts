// packages/api/types/auth.types.ts

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

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}
