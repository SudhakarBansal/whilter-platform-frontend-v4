"use client";

import DonutGraph from "../campaign-section/components/DonutGraph";
import WaveGraph from "../campaign-section/components/WaveGraph";
import type { CampaignType, CampaignStatus } from "@/data/campaignStatus";

export interface CampaignCardProps {
  title: string;
  type: CampaignType;
  progressPercent: number;
  generated: string;
  total: string;
  status: CampaignStatus;
  success: number;
  fail: number;
  pending: number;
  onStatusClick?: () => void;
}

const statusClasses: Record<CampaignStatus, string> = {
  LIVE: "bg-emerald-100 text-emerald-700",
  ACTIVE: "bg-sky-100 text-sky-700",
  Inactive: "bg-gray-100 text-gray-600",
  Rendering: "bg-yellow-100 text-yellow-800",
  Stopped: "bg-rose-100 text-rose-700",
  "In Production": "bg-indigo-100 text-indigo-700",
};

export default function CampaignCard({
  title,
  type,
  progressPercent,
  generated,
  total,
  status,
  success,
  fail,
  pending,
  onStatusClick,
}: CampaignCardProps) {
  return (
    <div className="w-[300px] h-[260px] rounded-[14px] bg-white shadow-xl flex flex-col">

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {title}
        </h3>
        <span
          className={`text-[11px] ${type === "batch" ? "text-sky-600" : "text-rose-500"
            } font-semibold uppercase`}
        >
          {type === "batch" ? "Batch Campaign" : "Real‑Time Campaign"}
        </span>

        {type === "batch" ? (
          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-md text-blue-500">Video Generated</p>
              <p className="text-3xl font-bold text-gray-900">
                {progressPercent}%
              </p>
              <p className="text-[11px] text-gray-500">
                {generated}/{total}
              </p>
            </div>

            <DonutGraph
              success={success}
              pending={pending}
              fail={fail}
              size={120}
              thickness={18}
            />
          </div>
        ) :
          (
            <div className="flex flex-col items-center mt-4 w-full">
            <WaveGraph
              success={success}
              pending={pending}
              fail={fail}
              height={120} 
            />
        
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-1 text-xs text-gray-800">
                <span className="w-[6px] h-[6px] rounded-full bg-[#10b981]" />
                <span>Success</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-800">
                <span className="w-[6px] h-[6px] rounded-full bg-[#f59e0b]" />
                <span>Pending</span>
              </div>
            </div>
          </div>
          )
        }
      </div>

      <div className="p-3 pt-0">
        <button
          onClick={onStatusClick}
          className={`w-full px-4 py-[5px] rounded-md text-[12px] font-semibold leading-none ${statusClasses[status]}`}
        >
          {status}
        </button>
      </div>
    </div>
  );
}
