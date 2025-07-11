"use client"
import { Plus } from "lucide-react"

interface CampaignCardProps {
    type?: "campaign" | "add"
    companyName?: string
    logoUrl?: string
    totalCampaigns?: number
    liveCampaigns?: number
    activeCampaigns?: number
    isSelected?: boolean
    onManageClick?: () => void
    onAddClick?: () => void
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
    onAddClick,
}: CampaignCardProps) {
    if (type === "add") {
        return (
            <div
                className="w-full h-[200px] rounded-[12px] bg-[#1e3a8a] flex items-center justify-center cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-lg"
                onClick={onAddClick}
            >
                <Plus className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
        )
    }

    return (
        <div
            className={`w-full lg:w-[300px] h-[260px] rounded-[12px] bg-white flex flex-col shadow-lg ${isSelected ? "ring-2 ring-[#1e3a8a]" : ""
                }`}
        >
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex justify-center items-center mb-3 h-[80px] bg-gray-100">
                    {logoUrl ? (
                        <img
                            src={logoUrl || "/placeholder.svg"}
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
                    <div className="text-sm text-blue-600 font-medium">{liveCampaigns} Campaign LIVE</div>
                    <div className="text-sm text-green-600 font-medium">{activeCampaigns} Active Campaign</div>
                </div>
            </div>

            <button
                className="w-full h-[55px] bg-[#1e3a8a] text-white text-lg font-medium rounded-b-[12px] hover:bg-[#1d4ed8] transition-colors"
                onClick={onManageClick}
            >
                Manage Campaigns
            </button>
        </div>
    )
}
