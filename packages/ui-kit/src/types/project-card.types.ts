export type ProjectStatus = 'completed' | 'in-process' | 'failed';

export interface ProjectStatusOverlayProps {
    status: ProjectStatus,
    progress?: number;
}

export interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        date: string;
        image: string;
        status: ProjectStatus,
        progress?: number;
    };
}
