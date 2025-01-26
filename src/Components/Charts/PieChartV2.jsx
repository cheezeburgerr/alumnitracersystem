"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

const rawData = [
  {
    choice_id: 54,
    choices: "Yes",
    user_id: 1,
    first_name: "Erjian",
    year: "2025",
    middle_name: "Arambulo",
    last_name: "Soriano",
    student_id: "21-SC-1495",
    email: "erjiansoriano05@gmail.com",
    address: "633 Mabini St. Poblacion",
    contact_number: "09685144938",
    answer_count: 1,
    latest_answer_date: "2025-01-03 03:56:47",
  },
  {
    choice_id: 54,
    choices: "Yes",
    user_id: 4,
    first_name: "John Henderson",
    year: "2025",
    middle_name: "Gueleng",
    last_name: "Gelido",
    student_id: "21-SC-1496",
    email: "johngelido@gmail.com",
    address: "Mabini St., Poblacion Urbiztondo, Pangasinan Philippines",
    contact_number: "09053310265",
    answer_count: 1,
    latest_answer_date: "2025-01-03 02:15:43",
  },
  {
    choice_id: 54,
    choices: "Yes",
    user_id: 19,
    first_name: "John",
    year: "2023",
    middle_name: "Bryan",
    last_name: "Tisado",
    student_id: "21-SC-1499",
    email: "johnbryantisado@gmail.com",
    address: "#109 Sitio Abot",
    contact_number: "09456387648",
    answer_count: 6,
    latest_answer_date: "2025-01-22 03:28:19",
  },
];


export default function PieChartComponent({ data,title,description,response,addButton }){
  
const groupedData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.choice === curr.choices);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ choice: curr.choices, count: 1 });
    }
    return acc;
  }, []);
  
  const chartData = groupedData.map((item, index) => ({
    choice: item.choice,
    count: item.count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));
  
  const chartConfig = {
    count: {
      label: "Responses",
    },
  };
    return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Survey Responses</CardTitle>
        <CardDescription>Responses for 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="choice">
              <LabelList
                dataKey="choice"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total responses for the latest data
        </div>
      </CardFooter>
    </Card>
  );
}
