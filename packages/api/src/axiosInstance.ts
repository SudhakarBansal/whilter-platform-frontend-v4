import axios from 'axios';
import { getSession } from 'next-auth/react';
import Router from 'next/router';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

instance.interceptors.request.use(async config => {
  const session = await getSession();
  // if (session?.accessToken) {
  //   config.headers.Authorization = `Bearer ${session.accessToken}`;
  // }
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      Router.replace('/login'); 
    }
    return Promise.reject(error);
  }
);

export default instance;
