import React from 'react';
import { toolsCardsData } from '@/lib/toolsCard.data'
import { ToolCard } from './ToolsCard';


export const ToolCardsGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {toolsCardsData.map((cardData) => (
                <ToolCard key={cardData.id} data={cardData} />
            ))}
        </div>
    );
};