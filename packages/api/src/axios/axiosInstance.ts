import axios, { AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@whilter/auth";
import { refreshToken } from "@whilter/api";
import type { Session } from "next-auth";
import { CHARP_ERROR_CODES } from "@whilter/shared-types";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const instance = createAxiosInstance();

instance.interceptors.request.use(async config => {
  let session: Session | null = null;

  if (typeof window === "undefined") {
    session = await getServerSession(authOptions);
  } else {
    session = await getSession();
  }

  const token = (session as any)?.accessToken;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  (config as any)._session = session;
  return config;
});

instance.interceptors.response.use(
   response => {
    console.log(" Axios Response:", {
      url: response.config?.url,
      method: response.config?.method,
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    return response;
  },
  async error => {
    console.error("Axios Error:", {
      url: error.config?.url,
      method: error.config?.method,
      message: error.message,
      status: error.response?.status,
      errorCode: error.response?.data?.errorCode,
      responseData: error.response?.data,
      headers: error.response?.headers,
    });
    const originalRequest = error.config;
    const status = error.response?.data?.status;
    const errorCode: string | undefined = error.response?.data?.errorCode;

    const session: Session | null = (originalRequest as any)._session;

    if (status === 401 && errorCode === CHARP_ERROR_CODES["CHARP-1102"].code) {
      if (typeof window !== "undefined") {
        await signOut({ callbackUrl: "/login" });
      }
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshTokenValue = (session as any)?.refreshToken;
        if (!refreshTokenValue) {
          if (typeof window !== "undefined") {
            await signOut({ callbackUrl: "/login" });
          }
          return Promise.reject(error);
        }

        const response = await refreshToken(refreshTokenValue);
        const newToken = response.accessToken;

        processQueue(null, newToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        if (typeof window !== "undefined") {
          await signOut({ callbackUrl: "/login" });
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const axiosInstance = instance;

