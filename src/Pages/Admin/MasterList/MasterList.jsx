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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [raw,setRaw] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE_URL}/users`)
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                setRaw(response.data)
            })
            .catch((error) => {
                setError("Failed to fetch user data. Please try again later.");
                console.error("Error fetching users:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Filter data based on year and course
    useEffect(() => {
        const filtered = data.filter((item) => {
            const matchesYear = !yearFilter || item.year === yearFilter;
            const matchesCourse = !courseFilter || item.course?.course_name === courseFilter;
            return matchesYear && matchesCourse;
        });
        setFilteredData(filtered);
    }, [data, yearFilter, courseFilter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <AdminLayout
            pageName="Master List"
            breadcrumb={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>Alumni</BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Master List</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
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
            {/* <div className="mb-4 flex items-center space-x-4">
                Year Filter
                <div>
                    <label htmlFor="yearFilter" className="mr-2 font-medium">
                        Filter by Year Graduated:
                    </label>
                    <select
                        id="yearFilter"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        aria-label="Filter by Year Graduated"
                    >
                        <option value="">All Years</option>
                        {[...new Set(data.map((item) => item.year))].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                Course Filter
                <div>
                    <label htmlFor="courseFilter" className="mr-2 font-medium">
                        Filter by Course:
                    </label>
                    <select
                        id="courseFilter"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="border rounded px-2 py-1 text-black"
                        aria-label="Filter by Course"
                    >
                        <option value="">All Courses</option>
                        {[...new Set(data.map((item) => item.course?.course_name))].map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
            </div> */}

            <DataTable columns={columns({ data: filteredData, setData })} data={filteredData} setYearFilter={setYearFilter} yearFilter={yearFilter} raw={raw} page={"masterlist"}  />
        </AdminLayout>
    );
}
