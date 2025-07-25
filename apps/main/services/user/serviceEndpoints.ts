

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = {
  createUser: `${AUTH_BASE}/create-user`,
  allUsers:`${AUTH_BASE}/all-users`,
  assignRole: `${AUTH_BASE}/assign-role`,
};
