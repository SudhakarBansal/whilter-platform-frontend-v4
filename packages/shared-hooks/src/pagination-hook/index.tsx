'use client'; 

import React, { useState } from 'react';

interface ViewPaginationWrapperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  initialCount?: number;
  className?: string; 
}

export default function ViewPaginationWrapper<T>({
  items,
  renderItem,
  initialCount = 4,
  className = "",
}: ViewPaginationWrapperProps<T>) {
  const [viewAll, setViewAll] = useState(false);

  const visibleItems = viewAll ? items : items.slice(0, initialCount);

  return (
    
    <div>
      <div
        className={`w-full grid justify-center gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))] ${className}`}
      >
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>

      {items.length > initialCount && (
        <div className="text-right mt-4">
          <button
            className="text-blue-600 hover:underline text-sm font-medium"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}
