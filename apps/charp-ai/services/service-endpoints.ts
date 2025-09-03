const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || "";
const DASHBOARD_BASE = process.env.NEXT_PUBLIC_APP_DASHBOARD_URL || "";

const ServiceEndpoints = {
  dashboard: {
    // getDashboardStats: `${AUTH_BASE}/media/stats`,
    getDashboardStats: `${DASHBOARD_BASE}/admin/assets/stats/all?campaign=""`,
  },
};
export default ServiceEndpoints;
