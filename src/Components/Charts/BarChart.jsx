"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export default function BarComponent() {
  return (
    <div className="border rounded-lg  p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Bar Chart - Multiple</h2>
        <p className="text-sm text-muted">January - June 2024</p>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              contentStyle={{ borderRadius: "4px", padding: "8px" }}
            />
            <Bar
              dataKey="desktop"
              fill={chartConfig.desktop.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="mobile"
              fill={chartConfig.mobile.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  );
}
