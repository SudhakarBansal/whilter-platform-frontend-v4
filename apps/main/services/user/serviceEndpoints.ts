

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = { 
  createUser: `${AUTH_BASE}/user`,
  user: `${AUTH_BASE}/user`,
  assignRole: `${AUTH_BASE}/assign-role`,
  getOrganization: `${AUTH_BASE}/org`,
  getRole: `${AUTH_BASE}/roles`,
  
};
