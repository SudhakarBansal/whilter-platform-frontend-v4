import type { ProjectStatus } from "./project-card.types";

export interface RecentCampaigns {
  id: number;
  title: string;
  date: string;
  status: ProjectStatus;
  image: string;
  progress: number;
}

export interface RecentCampaignProps{
  data : RecentCampaigns[];
  label: string;
}

