import { type ServiceCardData } from "@whilter/ui-kit/types";

const MEDIA_TOOLS_URL = process.env.NEXT_PUBLIC_MEDIA_TOOLS_URL;
const CHARP_AI_URL = process.env.NEXT_PUBLIC_CHARP_AI_URL;
const MARKETPLACE_URL = process.env.NEXT_PUBLIC_MARKETPLACE_URL;

export const services : ServiceCardData[] = [
    {
        id: 'media-tools',
        title: "Explore Media Tools",
        image: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        href: MEDIA_TOOLS_URL!
    },
    {
        id: 'charp-ai',
        title: "Explore Charp.AI",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
        href: CHARP_AI_URL!
    },
    {
        id: 'marketplace',
        title: "Explore Whilter Marketplace",
        image: "https://plus.unsplash.com/premium_photo-1661382011487-cd3d6b1d9dff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        href: MARKETPLACE_URL!
    }
];