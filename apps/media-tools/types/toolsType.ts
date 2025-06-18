// Types
export interface ToolCardData {
    id: string;
    title: string;
    description: string;
    icon: string;
    bgColor: string;
    iconColor: string;
}

export interface ToolCardProps {
    data: ToolCardData;
}
