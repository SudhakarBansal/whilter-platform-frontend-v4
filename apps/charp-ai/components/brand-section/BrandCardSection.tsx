"use client";

import { Plus } from "lucide-react";
import BrandCard from "./BrandCard";
import { brands } from "@/data/brand.data";
import {usePagination} from "@whilter/shared-hooks";

interface BrandsCardSectionProps {
  onAddClick?: () => void;
}

const BrandsCardSection: React.FC<BrandsCardSectionProps> = ({ onAddClick }) => {
  const { visibleItems, viewAll, toggleViewAll } = usePagination(brands, 4);

  return (
    <>
    <div>
     {brands?.length > 4 && (
        <div className="text-right">
          <button
            className="text-cyan-400 cursor-pointer hover:text-cyan-300  text-sm font-small"
            onClick={toggleViewAll}
          >
            {viewAll ? "Show Less" : "View all"}
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-[55px] w-full">
        {visibleItems.map((brand, idx) => (
          <BrandCard key={idx} {...brand} />
        ))}

        {/* <div className="w-full flex items-center" onClick={onAddClick}>
          <div className="w-[90px] h-[90px] rounded-[10px] bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <Plus size={34} className="text-white" />
          </div>
        </div> */}
      </div>
      </div>
    </>
  );
};

export default BrandsCardSection;
