import type { MediaStats } from "@/services/service-types";

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeColor: string;
  subValue: string;
}

export function mapMediaStatsToCards(stats: MediaStats): StatCardData[] {
  return [
    {
      title: "Total Media Requests",
      value: stats.totalMedia.toString(),
      change: "+0%",
      changeColor: "text-green-400",
      subValue: stats.totalMedia.toString(),
    },
    {
      title: "Total Media Generated",
      value: stats.generatedMedia.toString(),
      change: "+0%",
      changeColor: "text-green-400",
      subValue: stats.generatedMedia.toString(),
    },
    {
      title: "Total Media Failed",
      value: stats.failedMedia.toString(),
      change: "-0%",
      changeColor: "text-red-400",
      subValue: stats.failedMedia.toString(),
    },
    {
      title: "Total Media Pending",
      value: stats.processingMedia.toString(),
      change: "-0%",
      changeColor: "text-yellow-400",
      subValue: stats.processingMedia.toString(),
    },
  ];
}
