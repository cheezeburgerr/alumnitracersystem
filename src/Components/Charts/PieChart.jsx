
"use client";

import React, { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PieChartComponent({ data,title,description,response,addButton }) {
  console.log(data);

  // Group by answer (choices) and aggregate their counts
  const groupedData = useMemo(() => {
    return Object.values(
      data.reduce((acc, choice) => {
        const answerKey = choice.choices;
        if (!acc[answerKey]) {
          acc[answerKey] = {
            ...choice,
            alumni: 1,
          };
        } else {
          acc[answerKey].alumni += 1;
        }
        return acc;
      }, {})
    );
  }, [data]);

  console.log("Grouped Data with Count:", groupedData);

  // Format data for display in the chart
  const formattedData = useMemo(() => {
    const total = groupedData.reduce((acc, curr) => acc + curr.alumni, 0);
    return groupedData.map((choice, index) => ({
      ...choice,
      alumni: choice.alumni || choice.answer_count || 0,
      label: `${choice.choices} ${((choice.alumni / total) * 100).toFixed(2)}% `  , // Using choices as the label
      value: choice.alumni || choice.answer_count,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
  }, [groupedData]);

  console.log("Formatted Chart Data:", formattedData);

  const totalValue = useMemo(() => {
    return formattedData.reduce((acc, curr) => acc + curr.value, 0);
  }, [formattedData]);


  // const chartConfig = data.reduce((config, item, index) => {
  //   const colorIndex = index + 1;
  //   config[item.employment_status] = {
  //     label: item.employment_status,
  //     color: `hsl(var(--chart-${colorIndex}))`, 
  //   };
  //   return config;
  // }, {});

  const chartConfig = {

      Employed: {
        label: "Employed",
        fill: "hsl(var(--chart-1))",
      },
      Unemployed: {
        label: "Unemployed",
        fill: "hsl(var(--chart-2))",
      },
      NeverEmployed: {
        label: "Never-Employed",
        fill: "hsl(var(--chart-3))",
      },
    
    };

    

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                        {response}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {addButton}
        {/* <div className="leading-none text-muted-foreground">
          Showing employment status distribution
        </div> */}
      </CardFooter>
    </Card>
  );
}

