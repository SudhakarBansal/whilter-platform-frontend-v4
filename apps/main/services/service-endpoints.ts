import { requestOrgAccessValues } from "@/model/userFormInitialValues";

const AUTH_BASE = process.env.NEXT_PUBLIC_APP_AUTH_URL || '';

const ServiceEndpoints = {
    auth: {
        createUser: `${AUTH_BASE}/user`,
    },
    organization: {
        createOrganization: `${AUTH_BASE}/org`,
        getOrganization: `${AUTH_BASE}/org`,
        getOrganizationById: `${AUTH_BASE}/org`,
        paginatedOrganizationWithFilter: `${AUTH_BASE}/org/filter`
    },
    user: {
        createUser: `${AUTH_BASE}/user`,
        getUsers: `${AUTH_BASE}/user/get-all`,
        getPaginatedUsers: `${AUTH_BASE}/user/page`,
        paginatedUserWithFilter: `${AUTH_BASE}/user/filter`,
        getUserById: `${AUTH_BASE}/user/get`,
        assignRole: `${AUTH_BASE}/assign-role`,
        getRole: `${AUTH_BASE}/roles`,
        updateUser: `${AUTH_BASE}/user/update`,
        deleteUser: `${AUTH_BASE}/user`,
        joinOrgRequest: `${AUTH_BASE}/user`
    }

};
export default ServiceEndpoints