import AdminLayout from "../../../Layouts/AdminLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



import BarComponent from "@/Components/Charts/BarChart"
import PieChartComponent from "@/Components/Charts/PieChart"
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { useEffect, useState } from "react";
export default function AlumniAnalytics() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics`);
                const data = response.data;

                console.log(data);

                const formattedData = data.map((item, index) => ({
                    label: item.employment_status, // For display name
                    value: item.user_count, // Numeric value
                    fill: `hsl(var(--chart-${index + 1}))`,
                }));
                setChartData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    console.log(chartData);

    return (

        <>
            <AdminLayout pageName={"Alumni Analytics"} breadcrumb={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Analytics
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Alumni Analytics</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            } addButton={
                <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>

                </Tabs>

            }>
                <div className="flex gap-2">
                    <div className="w-3/4">
                        <BarComponent />
                    </div>
                    <div className="w-full">
                        {chartData.length > 0 && (
                            <PieChartComponent data={chartData} dataKey={'user_count'} nameKey={'employment_status'} />
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}