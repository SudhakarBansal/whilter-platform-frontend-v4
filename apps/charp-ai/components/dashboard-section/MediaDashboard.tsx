"use client";
import { MediaDistributionChart } from "./MediaDistributionChart";
import { TopMediaPlatformsChart } from "./TopMediaPlatformsChart";



export default function MediaDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TopMediaPlatformsChart />
      <MediaDistributionChart />
    </div>
  );
}
