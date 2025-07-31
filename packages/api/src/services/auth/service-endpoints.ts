

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = {
  login: `${AUTH_BASE}/auth/login`,
  signup: `${AUTH_BASE}/auth/signup`,
  googleLogin: `${AUTH_BASE}/auth/login/google`,
  refreshToken: `${AUTH_BASE}/auth/refresh`,
  logout: `${AUTH_BASE}/auth/logout`,
  forgotPassword: `${AUTH_BASE}/auth/forgot-password`,
  resetPassword: `${AUTH_BASE}/auth/reset-password`,
};
