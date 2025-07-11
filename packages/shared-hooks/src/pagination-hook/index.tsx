import { useState } from 'react';

export default function usePagination<T>(items: T[], initialCount = 4) {
  const [viewAll, setViewAll] = useState(false);
  const visibleItems = viewAll ? items : items.slice(0, initialCount);
  const toggleViewAll = () => setViewAll((prev) => !prev);

  return {
    visibleItems,
    viewAll,
    toggleViewAll,

  };
}
