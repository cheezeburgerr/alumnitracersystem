"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartConfig = {
  answerChoices: {
    label: "Choices",
    color: "hsl(var(--chart-1))",
  },
};

export default function SingleBarComponent({ data }) {


  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Employment Status Choices</h2>
        <p className="text-sm text-muted">Choices and Answer Counts</p>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="choices" // Use 'choices' for the X-axis labels
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              contentStyle={{ borderRadius: "4px", padding: "8px" }}
            />
            <Bar
              dataKey="alumni" // Use 'answer_count' to represent the data in the bar
              fill={chartConfig.answerChoices.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4 text-sm">
        {/* <div className="flex items-center gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted">
          Showing total answers for employment status choices
        </div>
      </div>
    </div>
  );
}
