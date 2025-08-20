
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeColor?: string;
  subValue: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeColor = "text-green-400",
  subValue,
}: StatCardProps) {
  return (
    <div className="w-full h-[160px] rounded-[28px] bg-gradient-to-b from-blue-300 to-blue-600 flex flex-col items-center justify-center shadow-lg">
      <div className="text-white text-[18px] font-normal mb-2 text-center">
        {title}
      </div>
      <div className="flex items-end mb-1">
        <span className="text-cyan-400 text-[34px] font-bold leading-none tracking-wide">
          {value}
        </span>
        {/* <span
          className={`ml-2 mb-2 text-[18px] font-semibold ${changeColor}`}
        >
          {change}
        </span> */}
      </div>

      {/* <div className="text-white text-[20px] font-normal opacity-85">
        {subValue}
      </div> */}
    </div>
  );
}