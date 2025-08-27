import { Card, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const campaignData = [
  {
    month: "Jan",
    dominos: 60,
    policyBazaar: 15,
    adityaBirla: 25,
    hdfc: 45,
    apple: 35,
  },
  {
    month: "Feb",
    dominos: 65,
    policyBazaar: 20,
    adityaBirla: 30,
    hdfc: 40,
    apple: 30,
  },
  {
    month: "Mar",
    dominos: 62,
    policyBazaar: 25,
    adityaBirla: 35,
    hdfc: 35,
    apple: 25,
  },
  {
    month: "Apr",
    dominos: 45,
    policyBazaar: 40,
    adityaBirla: 60,
    hdfc: 20,
    apple: 15,
  },
  {
    month: "May",
    dominos: 80,
    policyBazaar: 45,
    adityaBirla: 65,
    hdfc: 10,
    apple: 8,
  },
  {
    month: "Jun",
    dominos: 70,
    policyBazaar: 50,
    adityaBirla: 70,
    hdfc: 5,
    apple: 5,
  },
  {
    month: "Jul",
    dominos: 75,
    policyBazaar: 65,
    adityaBirla: 75,
    hdfc: 15,
    apple: 10,
  },
  {
    month: "Aug",
    dominos: 70,
    policyBazaar: 70,
    adityaBirla: 80,
    hdfc: 10,
    apple: 12,
  },
  {
    month: "Sep",
    dominos: 78,
    policyBazaar: 60,
    adityaBirla: 85,
    hdfc: 15,
    apple: 18,
  },
  {
    month: "Oct",
    dominos: 85,
    policyBazaar: 65,
    adityaBirla: 90,
    hdfc: 12,
    apple: 20,
  },
  {
    month: "Nov",
    dominos: 90,
    policyBazaar: 70,
    adityaBirla: 95,
    hdfc: 18,
    apple: 25,
  },
  {
    month: "Dec",
    dominos: 85,
    policyBazaar: 50,
    adityaBirla: 80,
    hdfc: 15,
    apple: 22,
  },
];

// Custom tooltip component with proper typing
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
    [key: string]: any;
  }>;
  label?: string;
}

// Custom tooltip for line chart
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    console.log("payoad", payload);

    return (
      <div className="bg-slate-800/95 rounded-xl p-3 text-white text-xs shadow-lg">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index: number) => (
          <p
            className="mt-1 text-slate-400 text-xs"
            key={index}
          >{`${entry.dataKey}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const TopMediaPlatformsChart = () => {
  return (
    <div className="lg:col-span-2">
      <Typography variant="h4" className="mb-4">
        Top Media Generating Campaigns
      </Typography>
      <Card className="bg-[#142762] p-6">
        <div className="h-96 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={campaignData}
              margin={{ top: 20, bottom: 5 }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.7)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.7)", fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="dominos"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
                name="Domino's year end wrap 2024"
              />
              <Line
                type="monotone"
                dataKey="policyBazaar"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                name="Policy Bazaar"
              />
              <Line
                type="monotone"
                dataKey="adityaBirla"
                stroke="#eab308"
                strokeWidth={3}
                dot={false}
                name="Aditya Birla"
              />
              <Line
                type="monotone"
                dataKey="hdfc"
                stroke="#ec4899"
                strokeWidth={3}
                dot={false}
                name="HDFC"
              />
              <Line
                type="monotone"
                dataKey="apple"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={false}
                name="Apple"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-white/70">Domino's year end wrap 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-white/70">Policy Bazaar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-white/70">Aditya Birla</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className="text-white/70">HDFC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
            <span className="text-white/70">Apple</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
