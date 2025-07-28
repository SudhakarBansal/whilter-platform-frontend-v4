

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = {
  createUser: `${AUTH_BASE}/user`,
  allUsers:`${AUTH_BASE}/user`,
  deleteUser: `${AUTH_BASE}/user`,
  assignRole: `${AUTH_BASE}/assign-role`,
};
