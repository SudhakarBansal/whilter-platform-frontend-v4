import { toolCardsData } from "@/data/toolCards.data";

export function getToolBySlug(slug: string | null) {

    // Early return if slug is undefined or null
    if (!slug || typeof slug !== 'string') {
        console.error("Invalid slug provided:", slug);
        return null;
    }

    // Handle both cases: with or without leading slash
    const normalizedSlug = slug.replace(/^\/+/, '');

    const foundTool = toolCardsData.find(tool => {
        const toolSlug = tool.href.replace(/^\/+/, '');
        return toolSlug === normalizedSlug;
    });
    return foundTool;
}