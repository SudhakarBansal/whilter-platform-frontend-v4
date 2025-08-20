import axios, {type AxiosInstance } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@whilter/auth";
import { refreshToken } from '@whilter/api'; // Assumes this works on client
import type { Session } from 'next-auth';

// Define the FailedRequest type
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token!);
  });
  failedQueue = [];
};

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
};

const instance = createAxiosInstance();

// Attach request interceptor
instance.interceptors.request.use(async config => {
  let session: Session | null = null;

  if (typeof window === 'undefined') {
    // Server-side
    session = await getServerSession(authOptions);
  } else {
    // Client-side
    session = await getSession();
  }

  const token = (session as any)?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Attach response interceptor (only runs on client side)
if (typeof window !== 'undefined') {
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
          const response = await refreshToken({}); // Pass empty object or required data
          const newToken = response.data.token; // Access token from response.data
          processQueue(null, newToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
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
}

export const axiosInstance = instance;
