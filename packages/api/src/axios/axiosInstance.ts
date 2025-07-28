import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { refreshToken } from '@whilter/api'; 

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});


instance.interceptors.request.use(async config => {
  const session = await getSession();
  console.log("sesion", session)
  if (session?.accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
 
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(instance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await refreshToken();
        processQueue(null, response.token);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = 'Bearer ' + response.token;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        signOut({ callbackUrl: '/' });
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const axiosInstance = instance;
