import AdminLayout from "../../../Layouts/AdminLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
            setChartData(data);
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

            }>
                <div className="grid grid-cols-3">
                    <div className="w-full">
                    <BarComponent/>
                    </div>
                    <div className="w-full">
                    {chartData.length > 0 && (
                        <PieChartComponent data={chartData}/>
                    )}
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}