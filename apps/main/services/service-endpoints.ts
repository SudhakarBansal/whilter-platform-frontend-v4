
const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

 const ServiceEndpoints = {
    auth: {
        createUser: `${AUTH_BASE}/user`,
    },
    organization: {
        getOrganization: `${AUTH_BASE}/org`,
    },
    user: {
        createUser: `${AUTH_BASE}/user`,
        getUsers: `${AUTH_BASE}/user`,
        assignRole: `${AUTH_BASE}/assign-role`,
        getOrganization: `${AUTH_BASE}/org`,
        getRole: `${AUTH_BASE}/roles`,
    }

};
export default ServiceEndpoints