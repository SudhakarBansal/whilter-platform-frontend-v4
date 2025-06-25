import { toolsCardsData } from "@/data/toolsCard.data";

export function getToolBySlug(slug: string | undefined) {
    console.log("Looking for slug:", slug);

    // Early return if slug is undefined or null
    if (!slug || typeof slug !== 'string') {
        console.error("Invalid slug provided:", slug);
        return undefined;
    }

    console.log("Available tools:", toolsCardsData.map(tool => ({
        title: tool.title,
        href: tool.href,
        extractedSlug: tool.href.replace(/^\/+/, '')
    })));

    // Handle both cases: with or without leading slash
    const normalizedSlug = slug.replace(/^\/+/, '');

    const foundTool = toolsCardsData.find(tool => {
        const toolSlug = tool.href.replace(/^\/+/, '');
        return toolSlug === normalizedSlug;
    });

    console.log("Found tool:", foundTool);
    return foundTool;
}