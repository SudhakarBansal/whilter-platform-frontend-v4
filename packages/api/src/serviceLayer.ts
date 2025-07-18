import axios from './axiosInstance';

export const userService = {
  getProfile: () => axios.get('/user/profile'),
  joinOrganization: (orgId: string) => axios.post('/org/join', { orgId }),
  requestActivation: () => axios.post('/user/request-activation'),
};

export const adminService = {
  approveUser: (userId: string) => axios.post(`/admin/approve/${userId}`),
  listUsers: () => axios.get('/admin/users'),
};
