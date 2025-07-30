const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

export const ServiceEndpoints = {
  getOrganization: `${AUTH_BASE}/org`,
};
