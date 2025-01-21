import AdminLayout from "../../../Layouts/AdminLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
    const [presentReasonStayingData, setPresentReasonStayingData] = useState([]);
    const [presentITRelatedData, setPresentITRelatedData] = useState([]);
    const [presentReasonForAcceptData, setPresentReasonForAcceptData] = useState([]);
    const [presentReasonForChangingData, setPresentReasonForChangingData] = useState([]);
    const [presentStayingFirstJobData, setPresentStayingFirstJobData] = useState([]);
    const [presentHowFindData, setPresentHowFindData] = useState([]);
    const [presentHowLongData, setPresentHowLongData] = useState([]);
    const [presentPositionFirstData, setPresentPositionFirstData] = useState([]);
    const [presentPositionPresentData, setPresentPositionPresentData] = useState([]);
    const [presentInitialGrossData, setPresentInitialGrossData] = useState([]);
    const [presentRelevantCurriculumData, setPresentRelevantCurriculumData] = useState([]);
    const [presentCompetenciesData, setPresentCompetenciesData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null); // Default to current year

        // Utility function to filter data by year
        const filterDataByYear = (data, year) => {
            if(year === 0 || year === null){
                return data
            }
            else{
                return data.filter(item => item.year === year);
            }
          
        };
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/analytics`);
                    const data = response.data;
        
                    // Filter the data by selected year
                    const yearFilteredData = filterDataByYear(data, selectedYear);
                    console.log("Filtered by year:", yearFilteredData);
        
            // Deduplicate by user_id and keep the latest answer (if applicable)
            const filteredLatestData = Object.values(
                yearFilteredData.reduce((acc, choice) => {
                    const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                    if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                        acc[userId] = choice; // Keep the latest response
                    }
                    return acc;
                }, {})
            );

            console.log("Filtered Latest Data:", filteredLatestData);

            // Group by answer (choices) and aggregate their counts
            const groupedData = Object.values(
                filteredLatestData.reduce((acc, choice) => {
                    const answerKey = choice.choices; // Use answer/choice as the grouping key
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            ...choice,
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {})
            );

            console.log("Grouped Data with Count:", groupedData);

            // Format data for display in the chart
            const formattedData = groupedData.map((choice, index) => ({
                ...choice,
                alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                label: choice.choices, // For display name
                value: choice.alumni || choice.answer_count, // Numeric value (total count)
                fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
            }));
                    setChartData(formattedData);
        
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
        
            fetchData();
        }, [selectedYear]);
        


        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/analytics5`);
                    const data = response.data;
        
                    console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);
        
                    console.log("Year: ", yearFilteredData);
        
                    // Deduplicate by user_id and keep the latest answer (if applicable)
                    const filteredLatestData = Object.values(
                        yearFilteredData.reduce((acc, item) => {
                            const userId = item.user_id; // Assuming `user_id` is the unique identifier for the user
                            if (!acc[userId] || new Date(item.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                                acc[userId] = item; // Keep the latest response
                            }
                            return acc;
                        }, {})
                    );
        
                    console.log("Filtered Latest Data:", filteredLatestData);
        
                    // Group by answer (choices) and aggregate their counts
                    const groupedData = Object.values(
                        filteredLatestData.reduce((acc, item) => {
                            const answerKey = item.choices; // Use answer/choice as the grouping key
                            if (!acc[answerKey]) {
                                acc[answerKey] = {
                                    ...item,
                                    alumni: 1, // Start count at 1 for this answer
                                };
                            } else {
                                acc[answerKey].alumni += 1; // Increment the count for this answer
                            }
                            return acc;
                        }, {})
                    );
        
                    console.log("Grouped Data with Count:", groupedData);
        
                    // Format data for display in the chart
                    const formattedData = groupedData.map((item, index) => ({
                        ...item,
                        alumni: item.alumni || item.answer_count || 0, // Set to 0 if missing
                        label: item.choices, // For display name
                        value: item.alumni || item.answer_count, // Numeric value (total count)
                        fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                    }));
        
                    setPresentPlaceOfWorkData(formattedData);
        
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
        
            fetchData();
        }, [selectedYear]);
        

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/analytics6`);
                    const data = response.data;
        
                    console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);
        
                    console.log("Year: ", yearFilteredData);
        
                    // Deduplicate by user_id and keep the latest answer (if applicable)
                    const filteredLatestData = Object.values(
                        yearFilteredData.reduce((acc, item) => {
                            const userId = item.user_id; // Assuming `user_id` is the unique identifier for the user
                            if (!acc[userId] || new Date(item.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                                acc[userId] = item; // Keep the latest response
                            }
                            return acc;
                        }, {})
                    );
        
                    console.log("Filtered Latest Data:", filteredLatestData);
        
                    // Group by answer (choices) and aggregate their counts
                    const groupedData = Object.values(
                        filteredLatestData.reduce((acc, item) => {
                            const answerKey = item.choices; // Use answer/choice as the grouping key
                            if (!acc[answerKey]) {
                                acc[answerKey] = {
                                    ...item,
                                    alumni: 1, // Start count at 1 for this answer
                                };
                            } else {
                                acc[answerKey].alumni += 1; // Increment the count for this answer
                            }
                            return acc;
                        }, {})
                    );
        
                    console.log("Grouped Data with Count:", groupedData);
        
                    // Format data for display in the chart
                    const formattedData = groupedData.map((item, index) => ({
                        ...item,
                        alumni: item.alumni || item.answer_count || 0, // Set to 0 if missing
                        label: item.choices, // For display name
                        value: item.alumni || item.answer_count, // Numeric value (total count)
                        fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                    }));
        
                    setPresentFirstJobData(formattedData);
        
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
        
            fetchData();
        }, [selectedYear]);
        

  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics1`);
                const data = response.data;
    
                console.log("Raw Data:", data);

                const yearFilteredData = filterDataByYear(data, selectedYear);
    
                // Transform the nested data structure
                const formattedData = Object.entries(yearFilteredData).flatMap(([year, months]) => {
                    return Object.entries(months).map(([month, details]) => {
                        const transformedItem = { month: details.month, year: parseInt(year, 10) };
    
                        // Iterate over the statuses and exclude "Never Employed"
                        details.statuses.forEach((status) => {
                            if (status.employment_status !== "NeverEmployed") {
                                transformedItem[status.employment_status] = status.percentage;
                            }
                        });
    
                        return transformedItem;
                    });
                });
    
                console.log("Formatted Data:", formattedData);
    
                setBarChartData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedYear]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics2`);
                const data = response.data;
    
                console.log(data);
                const yearFilteredData = filterDataByYear(data, selectedYear);
    
                console.log("year: ", yearFilteredData);
    
                // Deduplicate by user_id and keep the latest answer
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    label: choice.choices, // For display name
                    value: choice.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`,
                }));
    
                setSingleBarChartData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedYear]);
    
    

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics3`);
                const data = response.data;
    
                console.log(data);
                const yearFilteredData = filterDataByYear(data, selectedYear);
    
                console.log("Year: ", yearFilteredData);
    
                // Deduplicate by user_id and keep the latest answer
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    label: choice.choices, // For display name
                    value: choice.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
    
                setPresentOccupationData(formattedData);
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedYear]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics4`);
                const data = response.data;
    
                console.log(data);
                const yearFilteredData = filterDataByYear(data, selectedYear);
    
                console.log("Year: ", yearFilteredData);
    
                // Deduplicate by user_id and keep the latest answer (if applicable)
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
    
                setPresentLineOfWorkData(formattedData);
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedYear]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics7`);
                const data = response.data;
    
                console.log(data);
                const yearFilteredData = filterDataByYear(data, selectedYear);
    
                console.log("Year: ", yearFilteredData);
    
                // Group all responses with the same choice into one label, and aggregate their counts
                const groupedData = yearFilteredData.reduce((acc, item) => {
                    const answerKey = item.choices; // Use answer/choice as the grouping key
    
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            label: answerKey, // Group by the answer/choice
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {});
    
                console.log("Grouped Data with Counts:", groupedData);
    
                // Format the grouped data for display in the chart
                const formattedData = Object.values(groupedData).map((item, index) => ({
                    ...item,
                    value: item.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
    
                setPresentReasonStayingData(formattedData);
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [selectedYear]);
    
    

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics8`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

                  // Deduplicate by user_id and keep the latest answer (if applicable)
                  const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentITRelatedData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics9`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

      
                // Group all responses with the same choice into one label, and aggregate their counts
                const groupedData = yearFilteredData.reduce((acc, item) => {
                    const answerKey = item.choices; // Use answer/choice as the grouping key
    
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            label: answerKey, // Group by the answer/choice
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {});
    
                console.log("Grouped Data with Counts:", groupedData);
    
                // Format the grouped data for display in the chart
                const formattedData = Object.values(groupedData).map((item, index) => ({
                    ...item,
                    value: item.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentReasonForAcceptData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics10`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

      
                   // Group all responses with the same choice into one label, and aggregate their counts
                   const groupedData = yearFilteredData.reduce((acc, item) => {
                    const answerKey = item.choices; // Use answer/choice as the grouping key
    
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            label: answerKey, // Group by the answer/choice
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {});
    
                console.log("Grouped Data with Counts:", groupedData);
    
                // Format the grouped data for display in the chart
                const formattedData = Object.values(groupedData).map((item, index) => ({
                    ...item,
                    value: item.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentReasonForChangingData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics11`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

                     // Deduplicate by user_id and keep the latest answer (if applicable)
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
    
                setPresentStayingFirstJobData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics12`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

               // Deduplicate by user_id and keep the latest answer (if applicable)
               const filteredLatestData = Object.values(
                yearFilteredData.reduce((acc, choice) => {
                    const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                    if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                        acc[userId] = choice; // Keep the latest response
                    }
                    return acc;
                }, {})
            );

            console.log("Filtered Latest Data:", filteredLatestData);

            // Group by answer (choices) and aggregate their counts
            const groupedData = Object.values(
                filteredLatestData.reduce((acc, choice) => {
                    const answerKey = choice.choices; // Use answer/choice as the grouping key
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            ...choice,
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {})
            );

            console.log("Grouped Data with Count:", groupedData);

            // Format data for display in the chart
            const formattedData = groupedData.map((choice, index) => ({
                ...choice,
                alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                label: choice.choices, // For display name
                value: choice.alumni || choice.answer_count, // Numeric value (total count)
                fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
            }));
                setPresentHowFindData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics13`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);
    // Deduplicate by user_id and keep the latest answer (if applicable)
    const filteredLatestData = Object.values(
        yearFilteredData.reduce((acc, choice) => {
            const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
            if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                acc[userId] = choice; // Keep the latest response
            }
            return acc;
        }, {})
    );

    console.log("Filtered Latest Data:", filteredLatestData);

    // Group by answer (choices) and aggregate their counts
    const groupedData = Object.values(
        filteredLatestData.reduce((acc, choice) => {
            const answerKey = choice.choices; // Use answer/choice as the grouping key
            if (!acc[answerKey]) {
                acc[answerKey] = {
                    ...choice,
                    alumni: 1, // Start count at 1 for this answer
                };
            } else {
                acc[answerKey].alumni += 1; // Increment the count for this answer
            }
            return acc;
        }, {})
    );

    console.log("Grouped Data with Count:", groupedData);

    // Format data for display in the chart
    const formattedData = groupedData.map((choice, index) => ({
        ...choice,
        alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
        label: choice.choices, // For display name
        value: choice.alumni || choice.answer_count, // Numeric value (total count)
        fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
    }));
                setPresentHowLongData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics14`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);
    // Deduplicate by user_id and keep the latest answer (if applicable)
    const filteredLatestData = Object.values(
        yearFilteredData.reduce((acc, choice) => {
            const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
            if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                acc[userId] = choice; // Keep the latest response
            }
            return acc;
        }, {})
    );

    console.log("Filtered Latest Data:", filteredLatestData);

    // Group by answer (choices) and aggregate their counts
    const groupedData = Object.values(
        filteredLatestData.reduce((acc, choice) => {
            const answerKey = choice.choices; // Use answer/choice as the grouping key
            if (!acc[answerKey]) {
                acc[answerKey] = {
                    ...choice,
                    alumni: 1, // Start count at 1 for this answer
                };
            } else {
                acc[answerKey].alumni += 1; // Increment the count for this answer
            }
            return acc;
        }, {})
    );

    console.log("Grouped Data with Count:", groupedData);

    // Format data for display in the chart
    const formattedData = groupedData.map((choice, index) => ({
        ...choice,
        alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
        label: choice.choices, // For display name
        value: choice.alumni || choice.answer_count, // Numeric value (total count)
        fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
    }));
                setPresentPositionFirstData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics15`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

                 // Deduplicate by user_id and keep the latest answer (if applicable)
                 const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentPositionPresentData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics16`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

                // Deduplicate by user_id and keep the latest answer (if applicable)
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentInitialGrossData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics17`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

                     // Deduplicate by user_id and keep the latest answer (if applicable)
                const filteredLatestData = Object.values(
                    yearFilteredData.reduce((acc, choice) => {
                        const userId = choice.user_id; // Assuming `user_id` is the unique identifier for the user
                        if (!acc[userId] || new Date(choice.latest_answer_date) > new Date(acc[userId].latest_answer_date)) {
                            acc[userId] = choice; // Keep the latest response
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Filtered Latest Data:", filteredLatestData);
    
                // Group by answer (choices) and aggregate their counts
                const groupedData = Object.values(
                    filteredLatestData.reduce((acc, choice) => {
                        const answerKey = choice.choices; // Use answer/choice as the grouping key
                        if (!acc[answerKey]) {
                            acc[answerKey] = {
                                ...choice,
                                alumni: 1, // Start count at 1 for this answer
                            };
                        } else {
                            acc[answerKey].alumni += 1; // Increment the count for this answer
                        }
                        return acc;
                    }, {})
                );
    
                console.log("Grouped Data with Count:", groupedData);
    
                // Format data for display in the chart
                const formattedData = groupedData.map((choice, index) => ({
                    ...choice,
                    alumni: choice.alumni || choice.answer_count || 0, // Set to 0 if missing
                    label: choice.choices, // For display name
                    value: choice.alumni || choice.answer_count, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentRelevantCurriculumData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/analytics18`);
                const data = response.data;

                console.log(data);
                    const yearFilteredData = filterDataByYear(data, selectedYear);

             
                // Group all responses with the same choice into one label, and aggregate their counts
                const groupedData = yearFilteredData.reduce((acc, item) => {
                    const answerKey = item.choices; // Use answer/choice as the grouping key
    
                    if (!acc[answerKey]) {
                        acc[answerKey] = {
                            label: answerKey, // Group by the answer/choice
                            alumni: 1, // Start count at 1 for this answer
                        };
                    } else {
                        acc[answerKey].alumni += 1; // Increment the count for this answer
                    }
                    return acc;
                }, {});
    
                console.log("Grouped Data with Counts:", groupedData);
    
                // Format the grouped data for display in the chart
                const formattedData = Object.values(groupedData).map((item, index) => ({
                    ...item,
                    value: item.alumni, // Numeric value (total count)
                    fill: `hsl(var(--chart-${index + 1}))`, // Color for chart
                }));
                setPresentCompetenciesData(formattedData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedYear]);
    console.log(chartData);

    const renderPieChart = (data, dataKey, nameKey, title, description) => (
        data && data.length > 0 ? (
          <PieChartComponent 
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            title={title}
            description={description}
            response={title=="Employemnt Status"?"Alumni":"Responses"}
          />
        ) : (
          <div className="text-center text-muted-foreground">No data available</div>
        )
      );
      
      
 // Handle year selection from dropdown
 const handleYearChange = (event) => {
    
 
    setSelectedYear(Number(event));
};

// Generate the years for the dropdown (Example: 2020 to 2025)
const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2018; year--) {
        years.push(year);
    }
    return years;
};

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
                <Select onValueChange={handleYearChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Years</SelectLabel>
                        <SelectItem value="0" onClick={() => handleYearChange({ target: { value: "0" } })}>All year</SelectItem>
                        {generateYearOptions().map((year) => (
                            <SelectItem key={year} value={year} onClick={() => handleYearChange({ target: { value: year } })}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
                
            </Select>
            

            }>
                 <div className="flex gap-2 mb-3">
              
                    
            
     
                    <div className="w-full my-auto">

                    {renderPieChart(
  chartData, 
  'user_count', 
  'employment_status', 
  "Employemnt Status", 
  "Employement Distribution"
)}
           
                    </div>

                    <div className="w-full my-auto">       
                    {renderPieChart(
  singleBarChartData, 
  'user_count', 
  'employment_status', 
  "Employment Status Choices", 
  "Choices and Answer Counts"
)}

                    </div>

             
                    
                </div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentOccupationData.length > 0 &&
      renderPieChart(
        presentOccupationData,
        'user_count',
        'employment_status',
        "Present Occupation of Alumni",
        "Distribution of alumni's current job types"
      )}
  </div>
  <div className="w-full my-auto">
    {presentLineOfWorkData.length > 0 &&
      renderPieChart(
        presentLineOfWorkData,
        'user_count',
        'employment_status',
        "Major Line of Business of the Company of Alumni",
        "Distribution of alumni's major line of business of the company"
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentPlaceOfWorkData.length > 0 &&
      renderPieChart(
        presentPlaceOfWorkData,
        'user_count',
        'employment_status',
        "Place of Work",
        "Place of Work (Local/Abroad)"
      )}
  </div>
  <div className="w-full my-auto">
    {presentFirstJobData.length > 0 &&
      renderPieChart(
        presentFirstJobData,
        'user_count',
        'employment_status',
        "Post-Graduation Employment Data",
        "Number of alumni who secured their first job immediately after college (Yes/No)."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentReasonStayingData.length > 0 &&
      renderPieChart(
        presentReasonStayingData,
        'user_count',
        'employment_status',
        "Reasons for Staying in Current Company",
        "Distribution of alumni's reasons for staying with their current employer."
      )}
  </div>
  <div className="w-full my-auto">
    {presentITRelatedData.length > 0 &&
      renderPieChart(
        presentITRelatedData,
        'user_count',
        'employment_status',
        "IT-Related Jobs",
        "Number of alumni in IT-related jobs after graduation (Yes/No)."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentReasonForAcceptData.length > 0 &&
      renderPieChart(
        presentReasonForAcceptData,
        'user_count',
        'employment_status',
        "Reasons for Accepting Job Offers",
        "Distribution of alumni's reasons for accepting job offers."
      )}
  </div>
  <div className="w-full my-auto">
    {presentReasonForChangingData.length > 0 &&
      renderPieChart(
        presentReasonForChangingData,
        'user_count',
        'employment_status',
        "Reasons for Changing Jobs",
        "Distribution of alumni's reasons for changing jobs or employers."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentStayingFirstJobData.length > 0 &&
      renderPieChart(
        presentStayingFirstJobData,
        'user_count',
        'employment_status',
        "How long did you stay in your FIRST job?",
        "Distribution of alumni's major line of business of the company."
      )}
  </div>
  <div className="w-full my-auto">
    {presentHowFindData.length > 0 &&
      renderPieChart(
        presentHowFindData,
        'user_count',
        'employment_status',
        "Methods of Finding the First Job",
        "Distribution of alumni's methods for finding their first job after graduation."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentPositionFirstData.length > 0 &&
      renderPieChart(
        presentPositionFirstData,
        'user_count',
        'employment_status',
        "Job Level in First Employment",
        "Distribution of alumni's job levels in their first position after graduation."
      )}
  </div>
  <div className="w-full my-auto">
    {presentPositionPresentData.length > 0 &&
      renderPieChart(
        presentPositionPresentData,
        'user_count',
        'employment_status',
        "Job Level in Current Employment",
        "Distribution of alumni's job levels in their current position."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentHowLongData.length > 0 &&
      renderPieChart(
        presentHowLongData,
        'user_count',
        'employment_status',
        "Time Taken to Find the First Job",
        "Distribution of alumni based on the time taken to secure their first job after graduation."
      )}
  </div>
  <div className="w-full my-auto">
    {presentInitialGrossData.length > 0 &&
      renderPieChart(
        presentInitialGrossData,
        'user_count',
        'employment_status',
        "Initial Gross Monthly Earnings in First Job",
        "Distribution of alumni's initial gross monthly earnings in their first job after college."
      )}
  </div>
</div>

<div className="flex gap-2 mb-3">
  <div className="w-full my-auto">
    {presentRelevantCurriculumData.length > 0 &&
      renderPieChart(
        presentRelevantCurriculumData,
        'user_count',
        'employment_status',
        "Relevance of College Curriculum to First Job",
        "Number of alumni who found the college curriculum relevant to their first job after graduation (Yes/No)."
      )}
  </div>
  <div className="w-full my-auto">
    {presentCompetenciesData.length > 0 &&
      renderPieChart(
        presentCompetenciesData,
        'user_count',
        'employment_status',
        "Useful Competencies Learned in College for First Job",
        "Distribution of alumni's responses regarding which competencies learned in college were most useful in their first job."
      )}
  </div>
</div>

    

            </AdminLayout>
        </>
    )
}