"use client";

import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface CampaignCardProps {
  type?: "campaign" | "add";
  companyName?: string;
  logoUrl?: string;
  totalCampaigns?: number;
  liveCampaigns?: number;
  activeCampaigns?: number;
  isSelected?: boolean;
  onManageClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface BrandCardProps {
  items: CampaignCardProps[];
}

export default function BrandCard({ items }: BrandCardProps) {
  const router = useRouter();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleClick = (companyName?: string, onManageClick?: () => void) => {
    if (onManageClick) {
      onManageClick();
    } else if (companyName) {
      router.push(
        `/campaigns/${companyName.toLowerCase().replace(/\s+/g, "-")}`,
      );
    }
  };

  const toggleMenu = (idx: number) => {
    setOpenMenuIndex(openMenuIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
      {items.map((brand, idx) => (
        <div
          key={idx}
          className={`relative w-full h-[260px] rounded-[12px] bg-white flex flex-col shadow-lg mt-8 ${
            brand.isSelected ? "ring-2 ring-[#1e3a8a]" : ""
          }`}
        >
          {/* 3-dots menu */}
          <div className="absolute top-3 right-3">
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => toggleMenu(idx)}
            >
              <MoreVertical size={20} className="text-gray-700" />
            </button>

            {openMenuIndex === idx && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={() => {
                    brand.onEditClick?.();
                    setOpenMenuIndex(null);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                  onClick={() => {
                    brand.onDeleteClick?.();
                    setOpenMenuIndex(null);
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-center items-center mb-3 h-[80px] bg-gray-100">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={`${brand.companyName} logo`}
                  className="w-[94px] h-[84px] object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">
                    {brand.companyName?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="text-md font-semibold text-gray-800 mb-3">
              {brand.totalCampaigns} {brand.companyName} Campaigns
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-blue-600 font-medium">
                {brand.liveCampaigns} Campaign LIVE
              </div>
              <div className="text-sm text-green-600 font-medium">
                {brand.activeCampaigns} Active Campaign
              </div>
            </div>
          </div>

          <button
            className="w-full h-[55px] bg-[#1e3a8a] text-white text-md font-medium rounded-b-[12px] hover:bg-[#1d4ed8] transition-colors"
            onClick={() => handleClick(brand.companyName, brand.onManageClick)}
          >
            Manage Campaigns
          </button>
        </div>
      ))}
    </div>
  );
}
