"use client";
import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Users, MousePointer, DollarSign, Camera } from "lucide-react";
import { Card, Typography } from "@mui/material";

// Data for the chart
const chartData = [
  { name: "Domino's", value: 95, date: "15 Aug 2025" },
  { name: "Policy Bazaar", value: 110, date: "16 Aug 2025" },
  { name: "Aditya Birla", value: 75, date: "17 Aug 2025" },
  { name: "HDFC", value: 105, date: "18 Aug 2025" },
  { name: "Apple", value: 65, date: "19 Aug 2025" },
  { name: "LIC", value: 100, date: "20 Aug 2025" },
  { name: "Royal Enfield", value: 125, date: "21 Aug 2025" },
  { name: "Britannia", value: 90, date: "22 Aug 2025" },
  { name: "IDFC", value: 105, date: "23 Aug 2025" },
  { name: "ICICI", value: 70, date: "24 Aug 2025" },
];

// Stats data
const statsData = [
  {
    title: "Users",
    value: "32,984",
    icon: <Users size={20} />,
  },
  {
    title: "Clicks",
    value: "2.42m",
    icon: <MousePointer size={20} />,
  },
  {
    title: "Budget",
    value: "2,400$",
    icon: <DollarSign size={20} />,
  },
  {
    title: "Media Generated",
    value: "320",
    icon: <Camera size={20} />,
  },
];

// Custom tooltip component with proper typing
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
    payload: {
      name: string;
      value: number;
      date: string;
    };
    [key: string]: any;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 rounded-xl p-3 text-white text-xs shadow-lg">
        <p className="font-bold mb-1">{label}</p>
        <p>{`Value: ${payload?.[0]?.value}`}</p>
        <p className="mt-1 text-slate-400 text-xs">
          {payload?.[0]?.payload.date}
        </p>
      </div>
    );
  }
  return null;
};

export default function LeadingBrandsChart() {
  return (
    <div>
      <Typography variant="h4" className="mb-4">
        Leading Brands By Platform Usage
      </Typography>
      <Card className="bg-[#142762] p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-transparent p-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-xl bg-blue-300 mr-3`}>
                  {stat.icon}
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  {stat.title}
                </span>
              </div>
              <div className="text-white text-3xl font-bold mb-3 text-center">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Card */}
        <div className="h-96 w-full relative">
          <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.3)" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "rgba(255, 255, 255, 0.7)",
                  fontSize: 11,
                  textAnchor: "middle",
                }}
                height={80}
                interval={0}
              />
              <YAxis
                axisLine={true}
                tickLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.7)", fontSize: 12 }}
                domain={[0, 130]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#e879f9"
                strokeWidth={3}
                dot={{ fill: "#e879f9", strokeWidth: 2 }}
                activeDot={{ stroke: "#e879f9", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
