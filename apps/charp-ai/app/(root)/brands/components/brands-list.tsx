"use client";

import BrandCard from "./brand-files/brand-card";
import { brands } from "@/data/brand.data";
import { usePagination } from "@whilter/shared-hooks";

interface BrandsCardSectionProps {
  onAddClick?: () => void;
}

export const BrandsDataListing: React.FC<BrandsCardSectionProps> = ({
  onAddClick,
}) => {
  const { visibleItems, viewAll, toggleViewAll } = usePagination(brands, 4);

  return (
    <div>
      {brands?.length > 4 && (
        <div className="text-right">
          <button
            className="text-cyan-400 cursor-pointer hover:text-cyan-300 text-sm font-medium"
            onClick={toggleViewAll}
          >
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}

      <BrandCard items={visibleItems} />
    </div>
  );
};
