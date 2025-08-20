

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

const ServiceEndpoints = {
    dashboard: {
        getDashboardStats: `${AUTH_BASE}/media/stats`,
    }, 

};
export default ServiceEndpoints