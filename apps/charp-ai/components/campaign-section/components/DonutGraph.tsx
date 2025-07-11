/* components/DonutGraph.tsx */
"use client";
import React from "react";

interface DonutGraphProps {
  /** absolute counts or already‑scaled values */
  success: number;
  fail: number;
  pending: number;
  /** diameter in px (default 120) */
  size?: number;
  /** donut thickness in px (default 16) */
  thickness?: number;
  /** color palette (optional override) */
  colors?: {
    success: string;
    fail: string;
    pending: string;
    bg?: string; // inner circle color
  };
}

export default function DonutGraph({
  success,
  fail,
  pending,
  size = 120,
  thickness = 16,
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
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: thickness,
          background: colors.bg,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
