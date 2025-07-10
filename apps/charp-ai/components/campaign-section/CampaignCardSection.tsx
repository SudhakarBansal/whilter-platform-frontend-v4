import CampaignCard from "./CampaignCard"
import usePagination from "../../hooks/usePagination"
import { Plus } from "lucide-react"

const campaigns = [
    {
        companyName: "HDFC BANK",
        logoUrl: "/placeholder.svg?height=32&width=32",
        totalCampaigns: 8,
        liveCampaigns: 1,
        activeCampaigns: 3,
        isSelected: false,
    },
    {
        companyName: "Domino's Pizza",
        logoUrl: "/placeholder.svg?height=32&width=32",
        totalCampaigns: 5,
        liveCampaigns: 1,
        activeCampaigns: 1,
        isSelected: true,
    },
    

]

export default function CampaignCardSection() {
    const { visibleItems, viewAll, toggleViewAll } = usePagination(campaigns, 4);

    return (
        <>
            <div className="grid justify-center gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))]">
                {campaigns.map((campaign, idx) => (
                    <CampaignCard key={idx} {...campaign} />
                ))}
                <div className="w-[120px] h-[260px] flex items-center justify-center">
                    <div
                        className="w-[150px] h-[120px] rounded-[12px] bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                    >
                        <Plus size={50} className="text-white" />
                    </div>
                </div>
            </div >

        </>
    )
}
