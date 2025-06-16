import { ProjectStatus } from "./ProjectCardTypes";

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
