"use client";
import React from "react";

export interface RealtimeWaveGraphProps {
  success: number;
  pending: number;
  fail?: number;
  width?: number;
  height?: number;
  cycles?: number;
}

const WaveGraph: React.FC<RealtimeWaveGraphProps> = ({
  success,
  pending,
  fail = 0,
  width = 268,
  height = 120,
  cycles = 12,
}) => {
  const topPad = 8;
  const bottomPad = 18;
  const usableH = height - topPad - bottomPad;
  const amplitude = 5;
  const bandHeight = 42;

  const total = Math.max(success + pending + fail, 1);
  const successRatio = success / total;
  const pendingRatio = pending / total;

  const ySuccess = topPad + (1 - successRatio) * usableH;
  const yPending = topPad + (1 - pendingRatio) * usableH;

  const buildWave = (y: number) => {
    const seg = width / cycles;
    let d = `M0 ${y} Q${seg / 2} ${y - amplitude} ${seg} ${y}`;
    for (let i = 2; i <= cycles; i++) d += ` T${seg * i} ${y}`;
    return d;
  };

  const buildBand = (y: number) =>
    `${buildWave(y)} L ${width} ${y + bandHeight} L 0 ${y + bandHeight} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="block"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="grad-success"
          x1="0"
          y1={ySuccess}
          x2="0"
          y2={ySuccess + bandHeight}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="grad-pending"
          x1="0"
          y1={yPending}
          x2="0"
          y2={yPending + bandHeight}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>

        <filter id="waveShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="2.5"
            floodColor="black"
            floodOpacity="0.10"
          />
        </filter>
      </defs>

      <path d={buildBand(ySuccess)} fill="url(#grad-success)" />
      <path d={buildBand(yPending)} fill="url(#grad-pending)" />

      <path
        d={buildWave(ySuccess)}
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
        filter="url(#waveShadow)"
      />
      <path
        d={buildWave(yPending)}
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
        filter="url(#waveShadow)"
      />
    </svg>
  );
};

export default WaveGraph;
