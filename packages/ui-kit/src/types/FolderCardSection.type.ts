export interface AvatarData {
    id?: string;
    imageUrl?: string;
    count?: string;
    bgColor?: string; 
}

export interface FolderCardProps {
    title: string;
    projectCount: number;
    avatars: AvatarData[];
}


export interface FolderCardSectionProps {
    data: {
        folders: FolderCardProps[];
    };
}