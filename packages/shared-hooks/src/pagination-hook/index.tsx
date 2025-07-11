import { useState } from 'react';

export default function usePagination<T>(items: T[], initialCount = 4) {
  const [viewAll, setViewAll] = useState(false);
  const visibleItems = viewAll ? items : items.slice(0, initialCount);
  const toggleViewAll = () => setViewAll((prev) => !prev);

  return {
    visibleItems,
    viewAll,
    toggleViewAll,

    // {campaigns.length > 4 && (
    //             <div className="text-right mt-4">
    //                 <button
    //                     className="text-blue-600 hover:underline text-sm font-medium"
    //                     onClick={toggleViewAll}
    //                 >
    //                     {viewAll ? "Show Less" : "View All"}
    //                 </button>
    //             </div>
    //         )}

  };
}
