import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../Layouts/AdminLayout";
import { Skeleton } from "@/components/ui/skeleton"


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import moment from "moment";
import { API_BASE_URL } from "../../Components/api";
import LoadingState from "../../Components/LoadingState";
import { Eye } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import AlumniReport from "../Reports/AlumniReport";



export default function ViewAlumni() {

    const { id } = useParams();
    const [alumni, setAlumni] = useState(true);

    const [user, setUser] = useState();
    useEffect(() => {

        axios
            .get(`${API_BASE_URL}/users/${id}`)
            .then((response) => {
                setUser(response.data);

                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);

            });

    }, []);
    const [employmentHistory, setEmploymentHistory] = useState([]);

    useEffect(() => {
        if (user?.id) {
            const fetchEmploymentHistory = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/users/${user.id}`);
                    setEmploymentHistory(response.data.statuses);


                } catch (error) {
                    console.error("Error fetching employment history:", error);
                }
            };

            fetchEmploymentHistory();
        }
    }, [user]);

    return (
        <>

            <AdminLayout pageName={'Alumnus Details'} breadcrumb={
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                Alumni
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/masterlist">Master List</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Alumnus Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                </>
            } addButton={
                <PDFDownloadLink
                    document={<AlumniReport user={user} />}
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
            }>

                {user ? (

                    <>
                        <div className="md:flex gap-4 items-start space-y-4 md:space-y-0">
                            <div className="md:w-1/3 space-y-4">
                                <Card>
                                    <CardHeader>
                                        {/* <CardTitle> Profile</CardTitle> */}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center flex flex-col justify-center items-center">
                                            <img src="/../src/assets/profile_placeholder.png" alt="" className="h-36" />
                                            <h1 className="font-bold text-2xl mt-2">{user.first_name + ' ' + user.middle_name + ' ' + user.last_name}</h1>
                                            <Badge variant="outline">{user?.student_ID}</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Education</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <table className="text-sm text-left w-full p">
                                            <tr className="border-b">
                                                <th>Course</th>
                                                <td className="py-2">{user.course.course_name}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Batch</th>
                                                <td className="py-2">{user.year}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Specialization</th>
                                                <td className="py-2">{user.specialization || 'NA'}</td>
                                            </tr >
                                            <tr className="border-b">
                                                <th>Honors</th>
                                                <td className="py-2">{user.honors || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Exams</th>
                                                <td className="py-2">{user.prof_exams || 'NA'}</td>
                                            </tr>


                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="w-full space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <table className="text-sm text-left w-full p">
                                            <tr className="border-b">
                                                <th>Sex</th>
                                                <td className="py-2">Male</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Email</th>
                                                <td className="py-2">{user.email || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Contact Number</th>
                                                <td className="py-2">{user.contact_number || 'NA'}</td>
                                            </tr >
                                            <tr className="border-b">
                                                <th>Birthday</th>
                                                <td className="py-2">{moment(user.birthday).format('MMMM d, YYYY') || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Address</th>
                                                <td className="py-2">{user.address || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Province</th>
                                                <td className="py-2">{user.province || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Location</th>
                                                <td className="py-2">{user.location || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Region</th>
                                                <td className="py-2">{user.region || 'NA'}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <th>Civil Status</th>
                                                <td className="py-2">{user.civil_status || 'NA'}</td>
                                            </tr>

                                        </table>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between">
                                            <CardTitle>Employment Status</CardTitle>
                                            <Link to={`/admin/employment-history/${user.id}`}>
                                                <button className="text-primary text-sm font-bold">
                                                    View History
                                                </button>
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <CardContent >
                                        {user?.employment_status?.status ? (

                                            <div

                                                className="p-2 flex gap-4 justify-between items-start text-sm"
                                            >
                                                <div>
                                                    <Badge
                                                        variant={
                                                            user?.employment_status?.status?.status === "Employed"
                                                                ? "default"
                                                                : "destructive"
                                                        }
                                                    >
                                                        {user?.employment_status?.status?.status || "Unknown"}
                                                    </Badge>
                                                    <p>{moment(history.hire_date).format("MMMM D, YYYY")}</p>
                                                </div>
                                                <Link
                                                    to={`/admin/employment-details/${user?.employment_status?.id}`}
                                                    className="font-bold text-sm"
                                                >
                                                    <Button className="flex gap-1 items-center" size="sm" variant="outline">
                                                        <Eye />View
                                                    </Button>
                                                </Link>
                                            </div>

                                        ) : (
                                            <p>No employment history available.</p>
                                        )}

                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="relative w-full">
                            <LoadingState />
                        </div>

                    </>
                )}
            </AdminLayout>


        </>
    )
}