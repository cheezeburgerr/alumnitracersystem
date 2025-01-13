import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { API_BASE_URL } from "@/Components/api";
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

export default function DemoPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [yearFilter, setYearFilter] = useState("");
    const [courseFilter, setCourseFilter] = useState("");

    // Fetch data from the API
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/users`)
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    // Filter data based on year and course
    const handleFilterChange = () => {
        let filtered = data;

        if (yearFilter) {
            filtered = filtered.filter((item) => item.year === yearFilter);
        }

        if (courseFilter) {
            filtered = filtered.filter((item) => item.course?.course_name === courseFilter);
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        handleFilterChange();
    }, [yearFilter, courseFilter]);

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
                <PDFDownloadLink
                    document={<MasterListReport data={filteredData} />}
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
            }
        >
            <div className="mb-4 flex items-center space-x-4">
                {/* Year Filter */}
                <div>
                    <label htmlFor="yearFilter" className="mr-2 font-medium">
                        Filter by Year Graduated:
                    </label>
                    <select
                        id="yearFilter"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        style={{ color: "black" }}
                    >
                        <option value="">All Years</option>
                        {/* Dynamically generate unique years */}
                        {[...new Set(data.map((item) => item.year))].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Course Filter */}
                <div>
                    <label htmlFor="courseFilter" className="mr-2 font-medium">
                        Filter by Course:
                    </label>
                    <select
                        id="courseFilter"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        style={{ color: "black" }}
                    >
                        <option value="">All Courses</option>
                        {/* Dynamically generate unique courses */}
                        {[...new Set(data.map((item) => item.course?.course_name))].map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <DataTable columns={columns({ data: filteredData, setData })} data={filteredData} />
        </AdminLayout>
    );
}