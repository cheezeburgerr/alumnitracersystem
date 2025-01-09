"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function BarComponent({ data }) {
  // Transform the data into the format recharts expects
  const chartData = data;

  // Define color configuration for each employment status
  const chartConfig = {
    Employed: {
      label: "Employed",
      color: "hsl(var(--chart-1))",
    },
    Unemployed: {
      label: "Unemployed",
      color: "hsl(var(--chart-2))",
    },
    NeverEmployed: {
      label: "NeverEmployed",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Employment Status Bar Chart</h2>
        <p className="text-sm text-muted">Monthly Data for 2025</p>
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
              tickFormatter={(value) => value.slice(0, 3)} // Display short month name
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              contentStyle={{ borderRadius: "4px", padding: "8px" }}
            />
            {/* Create a Bar for each employment status */}
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartConfig[key].color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4 text-sm">
        {/* <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted">
          Showing employment statuses for 2025
        </div>
      </div>
    </div>
  );
}
