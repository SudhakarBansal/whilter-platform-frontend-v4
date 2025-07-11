/* components/DonutGraph.tsx */
"use client";
import React from "react";

interface DonutGraphProps {
  success: number;
  fail: number;
  pending: number;
  size?: number;
  thickness?: number;
  colors?: {
    success: string;
    fail: string;
    pending: string;
    bg?: string;
  };
}

export default function DonutGraph({
  success,
  fail,
  pending,
  size = 120,
  thickness = 18,
  colors = {
    success: "#1e3a8a",
    fail: "#ef4444",
    pending: "#f59e0b",
    bg: "#ffffff",
  },
}: DonutGraphProps) {
  const total = Math.max(success + fail + pending, 1);
  const successDeg = (success / total) * 360;
  const failDeg = (fail / total) * 360;
  const pendingDeg = 360 - successDeg - failDeg;

  const gradient = `conic-gradient(
      ${colors.success} 0deg ${successDeg}deg,
      ${colors.pending} ${successDeg}deg ${successDeg + pendingDeg}deg,
      ${colors.fail} ${successDeg + pendingDeg}deg 360deg
  )`;


  return (
    <div
      style={{
        width: size,
        height: size,
        background: gradient,
        borderRadius: "50%",
        position: "relative",
        transform: "rotate(120deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: thickness,
          background: colors.bg,
          borderRadius: "50%",
          transform: "rotate(-120deg)",
        }}
        className="flex flex-col items-center justify-center text-[10px] font-medium text-center gap-[4px]"
      >
        <div className="flex items-center gap-[4px]">
          <span
            className="w-[8px] h-[8px] rounded-full"
            style={{ backgroundColor: colors.success }}
          />
          <span className="text-black">Success</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span
            className="w-[8px] h-[8px] rounded-full"
            style={{ backgroundColor: colors.fail }}
          />
          <span className="text-black">Fail</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <span
            className="w-[8px] h-[8px] rounded-full"
            style={{ backgroundColor: colors.pending }}
          />
          <span className="text-black">Pending</span>
        </div>
        
      </div>
    </div>

  );
}
