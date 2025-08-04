import { updateUser } from "./actions/userService";

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
        getUsers: `${AUTH_BASE}/user/get-all`,
        getPaginatedUsers: `${AUTH_BASE}/user/page`,
        paginatedUserWithFilter:`${AUTH_BASE}/user/filter`,
        getUserById: `${AUTH_BASE}/user/get`,
        assignRole: `${AUTH_BASE}/assign-role`,
        getRole: `${AUTH_BASE}/roles`,
        updateUser: `${AUTH_BASE}/user`,
        deleteUser: `${AUTH_BASE}/user`,
    }

};
export default ServiceEndpoints