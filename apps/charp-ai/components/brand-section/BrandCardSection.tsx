import { Plus } from "lucide-react"
import BrandCard from "./BrandCard"
import { brands } from "@/data/brand.data"


export default function BrandCardSection() {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
                {brands.map((brand, idx) => (
                    <BrandCard key={idx} {...brand} />
                ))}
                <div className="w-full flex items-center">
                    <div className="w-[90px] h-[90px] rounded-[10px] bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                        <Plus size={34} className="text-white" />
                    </div>
                </div>
                </div>
        </>
    )
}