import BrandCard from "./BrandCard"

const brands = [
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

export default function BrandCardSection() {
    return (
        <div className="w-full grid justify-center gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))]">
            {brands.map((brand, idx) => (
                <BrandCard key={idx} {...brand} />
            ))}
        </div>
    )
}
