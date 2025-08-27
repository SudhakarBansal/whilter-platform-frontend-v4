import { Card, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Success", value: 70, color: "#8b5cf6" },
  { name: "Failed", value: 20, color: "#ec4899" },
  { name: "Pending", value: 10, color: "#64748b" },
];

export const MediaDistributionChart = () => {
  return (
    <div>
      <Typography variant="h4" className="mb-4">
        Media Distribution
      </Typography>
      <Card className="bg-[#142762] p-6">
        <div className="h-80 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey={"name"}
                cx="50%"
                cy="50%"
                label
                labelLine
                outerRadius={100}
                innerRadius={40}
                fill="#8884d8"
                startAngle={90}
                endAngle={450}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-3">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-white/70 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-semibold text-sm">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
