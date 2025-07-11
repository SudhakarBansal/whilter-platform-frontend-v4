import { Plus } from "lucide-react"
import BrandCard from "./BrandCard"

const brands = [
    {
        companyName: "HDFC BANK",
        logoUrl: "/icons/HDFC.svg",
        totalCampaigns: 8,
        liveCampaigns: 1,
        activeCampaigns: 3,
        isSelected: false,
    },
    {
        companyName: "Hero",
        logoUrl: "/icons/hero.svg",
        totalCampaigns: 5,
        liveCampaigns: 1,
        activeCampaigns: 1,
        isSelected: true,
    },
    {
        companyName: "Domino's Pizza",
        logoUrl: "/icons/dominos.svg",
        totalCampaigns: 5,
        liveCampaigns: 1,
        activeCampaigns: 1,
        isSelected: true,
    },
    {
        companyName: "HDFC BANK",
        logoUrl: "/icons/HDFC.svg",
        totalCampaigns: 8,
        liveCampaigns: 1,
        activeCampaigns: 3,
        isSelected: false,
    },
    {
        companyName: "Hero",
        logoUrl: "/icons/hero.svg",
        totalCampaigns: 5,
        liveCampaigns: 1,
        activeCampaigns: 1,
        isSelected: true,
    },
    {
        companyName: "Domino's Pizza",
        logoUrl: "/icons/dominos.svg",
        totalCampaigns: 5,
        liveCampaigns: 1,
        activeCampaigns: 1,
        isSelected: true,
    },


]

export default function BrandCardSection() {

    return (
        <>
            <div className="grid gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))]">
                {brands.map((brand, idx) => (
                    <BrandCard key={idx} {...brand} />
                ))}
                <div className="w-full flex items-center">
                    <div className="w-[90px] h-[90px] rounded-[10px] bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                        <Plus size={34} className="text-white" />
                    </div>
                </div>

            </div >
        </>
    )
}