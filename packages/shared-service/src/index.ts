import axios from 'axios';
 
const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
});
 
export default AxiosInstance;