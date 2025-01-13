import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { API_BASE_URL } from '@/Components/api';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/Components/ui/button";
import MasterListReport from "../../../Pages/Reports/MasterListReport";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DemoPage() {
    const [data, setData] = useState([]);
    const [batchFilter, setBatchFilter] = useState("All");
    const currentYear = new Date().getFullYear();
    const [selectedFilters, setSelectedFilters] = useState({
        status: null, // Track the selected status filter
    });

    
    console.log(batchFilter)
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/users`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        let updatedData = [...data];
        if (selectedFilters.status) {
            updatedData = updatedData.filter((user) => user.status === selectedFilters.status);
        }
        // setData(updatedData);
    }, [data, selectedFilters]);


    const handleFilterChange = (filterKey, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterKey]: value,
        }));
    };

    // Filter data based on the selected batch
    const filteredData = batchFilter === "All"
        ? data
        : data.filter((user) => user.year == parseInt(batchFilter));

    return (
        <AdminLayout
            pageName="Master List"
            breadcrumb={
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>Alumni</BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Master List</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            }
            addButton={
                <div className="flex justify-start gap-2">
                <Select onValueChange={(value) => setBatchFilter(value)}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by Batch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {Array.from({ length: currentYear - 2018 }, (_, i) => (
                            <SelectItem key={i} value={(2019 + i).toString()}>
                                Batch {2019 + i}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <PDFDownloadLink
                    document={<MasterListReport data={filteredData} batch={batchFilter} />}
                    fileName="alumni_report.pdf"
                >
                    {({ loading }) =>
                        loading ? (
                            <Button variant="outline" disabled>
                                Generating Report...
                            </Button>
                        ) : (
                            <Button variant="outline">Download Report</Button>
                        )
                    }
                </PDFDownloadLink>
            </div>
            
               
            }
        >


            <DataTable columns={columns({ data: filteredData, setData })} data={filteredData} onFilterChange={handleFilterChange} // Pass the filter change handler
 />
        </AdminLayout>
    );
}
