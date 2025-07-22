

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = {
  login: `${AUTH_BASE}/api/user/login`,
  getUserPermissions: `${AUTH_BASE}/auth/permissions`,
  signup: `${AUTH_BASE}/auth/signup`,
  refreshToken: `${AUTH_BASE}/auth/refresh-token`,
  forgotPassword: `${AUTH_BASE}/auth/forgot-password`,
  resetPassword: `${AUTH_BASE}/auth/reset-password`,
  createUser: `${AUTH_BASE}/admin/create-user`,
  assignRole: `${AUTH_BASE}/admin/assign-role`,
};
