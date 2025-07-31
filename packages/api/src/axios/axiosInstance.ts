import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { refreshToken } from '@whilter/api';
import type { Session } from 'next-auth';
import type { LoginResponse } from '../services/auth/auth.types';

interface CustomSession extends Session {
  accessToken?: string;
  refreshToken?: string;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  async (config: any) => {
    const session = (await getSession()) as CustomSession;

    if (session?.accessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
              }
              resolve(instance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const session = (await getSession()) as CustomSession;
        const refreshTokenValue = session?.refreshToken;

        if (!refreshTokenValue) {
          throw new Error('Missing refresh token');
        }

        const { data }: { data: LoginResponse } = await refreshToken(refreshTokenValue);

        processQueue(null, data.accessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        }

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
