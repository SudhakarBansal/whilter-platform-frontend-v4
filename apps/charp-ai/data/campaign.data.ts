import type { CampaignStatus, CampaignType } from "./campaignStatus";

export type Campaign = {
  title: string;
  type: CampaignType;
  progressPercent: number;
  generated: string;
  total: string;
  status: CampaignStatus;
  success: number;
  fail: number;
  pending: number;
};

export const campaigns: readonly Campaign[] = [
  {
    title: "Domino’s Year‑End Recipients",
    type: "batch",
    progressPercent: 72,
    generated: "7.2 K",
    total: "10 K",
    status: "LIVE",
    success: 7200,
    pending: 1800,
    fail: 1000,
  },
  {
    title: "Pizza‑Time RT",
    type: "realtime",
    progressPercent: 0,
    generated: "7.2 k",
    total: "10 k",
    status: "ACTIVE",
    success: 7200,
    pending: 1800,
    fail: 1000,
  },
  {
    title: "Domino’s Year‑End Recipients",
    type: "batch",
    progressPercent: 72,
    generated: "7.2 K",
    total: "10 K",
    status: "LIVE",
    success: 7200,
    pending: 1800,
    fail: 1000,
  },
  {
    title: "Pizza‑Time RT",
    type: "realtime",
    progressPercent: 0,
    generated: "7.2 k",
    total: "10 k",
    status: "ACTIVE",
    success: 7200,
    pending: 1800,
    fail: 1000,
  },
  
] as const; 
