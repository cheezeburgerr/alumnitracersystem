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


import SingleBarComponent from "@/Components/Charts/SingleBarChart"
import BarComponent from "@/Components/Charts/BarChart"
import BarChartHorizontal from "@/Components/Charts/BarChartHorizontal"
import PieChartComponent from "@/Components/Charts/PieChart"
import LineChartComponent from "@/Components/Charts/LineChart"
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { useEffect, useState } from "react";
export default function AlumniAnalytics() {
    const [chartData, setChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [singleBarChartData, setSingleBarChartData] = useState([]);
    const [presentOccupationData, setPresentOccupationData] = useState([]);
    const [presentLineOfWorkData, setPresentLineOfWorkData] = useState([]);
    const [presentPlaceOfWorkData, setPresentPlaceOfWorkData] = useState([]);
    const [presentFirstJobData, setPresentFirstJobData] = useState([]);


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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics5`);
                const data = response.data;

                console.log(data);

                const formattedData = data.map((item, index) => ({
                    label: item.choices, // For display name
                    value: item.answer_count, // Numeric value
                    fill: `hsl(var(--chart-${index + 1}))`,
                }));
                setPresentPlaceOfWorkData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics6`);
                const data = response.data;

                console.log(data);

                const formattedData = data.map((item, index) => ({
                    label: item.choices, // For display name
                    value: item.answer_count, // Numeric value
                    fill: `hsl(var(--chart-${index + 1}))`,
                }));
                setPresentFirstJobData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics1`);
                const data = response.data;

                console.log(data);

                const formattedData = data.map((item) => {
                    const transformedItem = { month: item.month };
                    item.statuses.forEach((status) => {
                      transformedItem[status.employment_status] = status.count;
                    });
                    return transformedItem;
                  });
                  console.log('formatted:',formattedData)

                //   const newData = [
                //     {
                //       "month": "February",
                //       "Employed": 7,
                //       "Unemployed": 3,
                //       "NeverEmployed": 3
                //     },
                //     {
                //         "month": "March",
                //         "Employed": 7,
                //         "Unemployed": 3,
                //         "NeverEmployed": 3
                //       }
                //   ];
                  
                //   // Append the new data to the existing formattedData
                //   const updatedData = [...formattedData, ...newData];
                setBarChartData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics2`);
                const data = response.data;

                console.log(data);

                const formattedData =  data.map((choice) => ({
                  ...choice, 
                  alumni: choice.answer_count || 0, // Ensure there's an answer count, default to 0 if undefined
                }));
                setSingleBarChartData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics3`);
                const data = response.data;

                console.log(data);

                const formattedData =  data.map((choice) => ({
                  ...choice, 
                  alumni: choice.answer_count || 0, // Ensure there's an answer count, default to 0 if undefined
                }));
                setPresentOccupationData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics4`);
                const data = response.data;

                console.log(data);

                const formattedData =  data.map((choice) => ({
                  ...choice, 
                  alumni: choice.answer_count || 0, // Ensure there's an answer count, default to 0 if undefined
                }));
                setPresentLineOfWorkData(formattedData);

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
                 <div className="flex gap-2 mb-3">
                    <div className="w-3/4">
                        <LineChartComponent data={barChartData} />
                    </div>
                    <div className="w-full my-auto">
                        {chartData.length > 0 && (
                            <PieChartComponent data={chartData} dataKey={'user_count'} nameKey={'employment_status'} title={"Employemnt Status"} description={"Employement Distribution"} />
                        )}
                    </div>
                    
                </div>
                <div className="flex gap-2 mb-3">
                    <div className="w-full">
                        <SingleBarComponent data={singleBarChartData} />
                        
                    </div>
                  
                    
                </div>

                <div className="flex gap-2 mb-3">
                    <div className="w-full">
                        <BarChartHorizontal  data={presentOccupationData} title={"Present Occupation of Alumni"} description={"Distribution of alumni's current job types"}/>
                        
                    </div>
                  
                    
                </div>

                <div className="flex gap-2 mb-3">
                    <div className="w-full">
                        <BarChartHorizontal  data={presentLineOfWorkData} title={"Major Line of Business of the Company of Alumni"} description={"Distribution of alumni's major line of business of the company"}/>
                        
                    </div>
                  
                    
                </div>


                <div className="flex gap-2 mb-3">
                    <div className="w-full my-auto">
                        {chartData.length > 0 && (
                            <PieChartComponent data={presentPlaceOfWorkData} dataKey={'user_count'} nameKey={'employment_status'} title={"Place of Work"} description={"place of work"} />
                        )}
                    </div>
                    
                </div>

                <div className="flex gap-2 mb-3">
                    <div className="w-full my-auto">
                        {chartData.length > 0 && (
                            <PieChartComponent data={presentFirstJobData} dataKey={'user_count'} nameKey={'employment_status'} title={"First Job After College"} description={"First job after college?"} />
                        )}
                    </div>
                    
                </div>

               
            </AdminLayout>
        </>
    )
}