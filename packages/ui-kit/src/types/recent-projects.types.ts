import type { ProjectStatus } from "./project-card.types";

export interface RecentProject {
  id: number;
  title: string;
  date: string;
  status: ProjectStatus;
  image: string;
  progress: number;
}

export interface RecentProjectProps{
  data : RecentProject[];
}
