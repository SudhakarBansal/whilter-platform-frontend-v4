import React from 'react';
import { toolCardsData } from '@/data/toolCards.data'
import { ToolCard } from './ToolCard';


export const FeaturedToolsSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {toolCardsData.map((cardData) => (
                <ToolCard key={cardData.id} data={cardData} />
            ))}
        </div>
    );
};