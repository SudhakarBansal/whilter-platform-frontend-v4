"use client";

import CampaignCard from "./CampaignCard";
import type { CampaignType, CampaignStatus } from "../../data/campaignStatus";

interface Campaign {
  title: string;
  type: CampaignType;
  progressPercent: number;
  generated: string;
  total: string;
  status: CampaignStatus;
  success: number;
  fail: number;
  pending: number;
}

const campaigns: Campaign[] = [
  {
    title: "Domino's Year End Recap – 2024",
    type: "batch",
    progressPercent: 72,
    generated: "152K",
    total: "220K",
    status: "LIVE",
    success: 50,
    pending: 30,
    fail: 20,
  },
  {
    title: "Domino's Year End Recap – 2024",
    type: "batch",
    progressPercent: 72,
    generated: "152K",
    total: "220K",
    status: "ACTIVE",
    success: 72,
    pending: 15,
    fail: 13,
  },
  {
    title: "Domino's Christmas Reel – 2024",
    type: "realtime",
    progressPercent: 0,
    generated: "",
    total: "",
    status: "Inactive",
    success: 0,
    pending: 0,
    fail: 0,
  },
  {
    title: "Domino's Year End Recap – 2024",
    type: "batch",
    progressPercent: 72,
    generated: "152K",
    total: "220K",
    status: "Rendering",
    success: 72,
    pending: 15,
    fail: 13,
  },
  {
    title: "Domino's Year End Recap – 2024",
    type: "batch",
    progressPercent: 72,
    generated: "152K",
    total: "220K",
    status: "Stopped",
    success: 72,
    pending: 15,
    fail: 13,
  },
  {
    title: "Domino's Christmas Reel – 2024",
    type: "realtime",
    progressPercent: 0,
    generated: "",
    total: "",
    status: "In Production",
    success: 0,
    pending: 0,
    fail: 0,
  },
];

export default function CampaignCardSection() {
  return (
      <div className="grid justify-center gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))]">
        {campaigns.map((c, i) => (
          <CampaignCard key={i} {...c} />
        ))}
      </div>
  );
}
