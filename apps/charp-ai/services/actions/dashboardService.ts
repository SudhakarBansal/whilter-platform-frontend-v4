import {axiosInstance} from "@whilter/api"
import ServiceEndpoints from "../service-endpoints"
import type { MediaStats } from "../service-types";
import axios from 'axios'

export interface MediaStatsResponse {
  data: MediaStats;
  error?: string;
}

export async function getDashboardStats(): Promise<MediaStats> {

  try {

    const response = await axiosInstance.get(ServiceEndpoints.dashboard.getDashboardStats);
    return response.data;
  } catch (error: any) {
    const errorResponse =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "An unexpected error occurred";

    return {
      totalMedia: 0,
      generatedMedia: 0,
      failedMedia: 0,
      processingMedia: 0,

    };
  }
}







 