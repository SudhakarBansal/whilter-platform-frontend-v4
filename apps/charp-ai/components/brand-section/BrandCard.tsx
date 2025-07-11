"use client";

import { useRouter } from "next/navigation";

interface CampaignCardProps {
  type?: "campaign" | "add";
  companyName?: string;
  logoUrl?: string;
  totalCampaigns?: number;
  liveCampaigns?: number;
  activeCampaigns?: number;
  isSelected?: boolean;
  onManageClick?: () => void;
}

export default function BrandCard({
    type = "campaign",
    companyName,
    logoUrl,
    totalCampaigns = 0,
    liveCampaigns = 0,
    activeCampaigns = 0,
    isSelected = false,
    onManageClick,
}: CampaignCardProps) {

  const router = useRouter();

  const handleClick = () => {
    if (onManageClick) {
      onManageClick();
    } else {
      router.push(`/campaigns/${companyName?.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  return (
    <div
      className={`w-full h-[260px] rounded-[12px] bg-white flex flex-col shadow-lg mt-8 ${
        isSelected ? "ring-2 ring-[#1e3a8a]" : ""
      }`}
    >
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex justify-center items-center mb-3 h-[80px] bg-gray-100">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${companyName} logo`}
              className="w-[94px] h-[84px] object-contain"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">
                {companyName?.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="text-md font-semibold text-gray-800 mb-3">
          {totalCampaigns} {companyName} Campaigns
        </div>
        <div className="space-y-1.5">
          <div className="text-sm text-blue-600 font-medium">
            {liveCampaigns} Campaign LIVE
          </div>
          <div className="text-sm text-green-600 font-medium">
            {activeCampaigns} Active Campaign
          </div>
        </div>
      </div>

      <button
        className="w-full h-[55px] bg-[#1e3a8a] text-white text-md font-medium rounded-b-[12px] hover:bg-[#1d4ed8] transition-colors"
        onClick={handleClick}
      >
        Manage Campaigns
      </button>
    </div>
  );
};


