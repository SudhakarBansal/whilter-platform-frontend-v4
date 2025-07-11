"use client";

import CampaignCard from "./CampaignCard";
import { campaigns } from "@/data/campaign.data"


export default function CampaignCardSection() {
  return (
      <div className="grid justify-center gap-12 [grid-template-columns:repeat(auto-fill,minmax(260px,max-content))]">
        {campaigns.map((c, i) => (
          <CampaignCard key={i} {...c} />
        ))}
      </div>
  );
}
