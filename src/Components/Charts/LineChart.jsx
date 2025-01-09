"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function LineChartComponent({ data }) {


    console.log("here:",data)
  const chartConfig = {
    employed: {
      label: "Employed",
      color: "hsl(var(--chart-1))",
    },
    unemployed: {
      label: "Unemployed",
      color: "hsl(var(--chart-2))",
    },
    neverEmployed: {
      label: "Never Employed",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Employment Status</CardTitle>
        <CardDescription>Survey Results for this Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Employed"
              type="monotone"
              stroke={chartConfig.employed.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Unemployed"
              type="monotone"
              stroke={chartConfig.unemployed.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="NeverEmployed"
              type="monotone"
              stroke={chartConfig.neverEmployed.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing total responses for employment status in the current month.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
