import axios from 'api/axios';

export const fetchPlatformData = async () => {
  const response = await axios.get('/platform/data');
  return response.data;
};
