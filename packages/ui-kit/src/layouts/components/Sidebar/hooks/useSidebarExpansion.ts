// hooks/useSidebarExpansion.ts
import { useState, useCallback } from 'react';

export const useSidebarExpansion = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandToggle = useCallback((itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const isExpanded = useCallback((itemId: string) => 
    expandedItems.includes(itemId), [expandedItems]);

  return {
    expandedItems,
    handleExpandToggle,
    isExpanded,
  };
};