import React from 'react';
import { toolsCardsData } from '@/data/toolsCard.data'
import { ToolCard } from './ToolsCard';


export const ToolCardsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {toolsCardsData.map((cardData) => (
                <ToolCard key={cardData.id} data={cardData} />
            ))}
        </div>
    );
};