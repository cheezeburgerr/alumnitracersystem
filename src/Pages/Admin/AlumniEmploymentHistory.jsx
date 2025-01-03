import AlumniLayout from "../../Layouts/AlumniLayout";
import {
    Timeline,
    TimelineItem,
    TimelineTitle,
    TimelineDescription,
    TimelineTime,
    TimelineHeader,
} from '@/components/ui/timeline';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Button
} from '@/components/ui/button';

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Components/api";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import AdminLayout from "../../Layouts/AdminLayout";

import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LoadingState from "../../Components/LoadingState";

export default function AlumniEmploymentHistory() {

    const { id } = useParams();

    const [user, setUser] = useState();

    const [employmentHistory, setEmploymentHistory] = useState([]);

    const timelineData = [
        {
            id: 1,
            title: 'Vercel was founded in SF, Italy',
            description:
                'Vercel Inc., formerly ZEIT, is an American cloud platform as a service company. The company maintains the Next.js web development framework.',
            time: 'May, 2020',
        },
        {
            id: 2,
            title: 'Shadcn First Commit',
            description:
                'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
            time: 'January, 2023',
        },
        {
            id: 3,
            title: 'Shadcn Timeline',
            description: 'Shadcn timeline component. Open Source.',
            time: 'November, 2024',
        },
    ];

    useEffect(() => {
        if (id) {
            const fetchEmploymentHistory = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
                    setEmploymentHistory(response.data.statuses);

                    console.log(response.data)
                    setUser(response.data);


                } catch (error) {
                    console.error("Error fetching employment history:", error);
                }
            };

            fetchEmploymentHistory();
        }
    }, [id]);


    return (
        <>
            <AdminLayout pageName={`Employment History`} breadcrumb={
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
                            <BreadcrumbLink href={`/admin/view-alumni/${user?.id}`}>Alumnus Details</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Employment History</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }>

                {user ? (
                    <div className="lg:flex gap-4 items-start">
                        <Card className="w-1/3">
                            <CardHeader />
                            <CardContent>
                                <div className="text-center flex flex-col justify-center items-center">
                                    <img src="/../src/assets/profile_placeholder.png" alt="" className="h-36" />
                                    <h1 className="font-bold text-2xl mt-2">{user?.first_name + ' ' + user?.middle_name + ' ' + user?.last_name}</h1>
                                    <Badge variant="outline">{user?.student_ID}</Badge>
                                </div>
                            </CardContent>
                        </Card>


                        <Card className="w-full">
                            <CardContent>
                                <Timeline className="mt-8">
                                    {employmentHistory.map((item) => (
                                        <TimelineItem key={item.id}>
                                            <TimelineHeader>
                                                <TimelineTime>{moment(item.created_at).format('MMMM D, YYYY')}</TimelineTime>
                                                <TimelineTitle>{item.status.status}</TimelineTitle>

                                            </TimelineHeader>
                                            <TimelineDescription>
                                                {item.status.status === "Employed" && (
                                                    <>
                                                        <div className="text-sm mb-2">
                                                            <p className="font-semibold">
                                                                {item.answers.find(
                                                                    (answer) => answer.employment_questions_ID === 3
                                                                )?.answer || "No answer available"}
                                                            </p>
                                                            <p className="">
                                                                {item.answers.find(
                                                                    (answer) => answer.employment_questions_ID === 2
                                                                )?.answer || "No answer available"}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                                <Link
                                                    to={`/admin/employment-details/${item.id}`}
                                                    className="font-bold text-sm"
                                                >
                                                    <Button className="flex gap-1 items-center" size="sm" variant="outline">
                                                        <Eye /> View
                                                    </Button>
                                                </Link>
                                            </TimelineDescription>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <LoadingState/>
                )}
            </AdminLayout>
        </>
    )
}