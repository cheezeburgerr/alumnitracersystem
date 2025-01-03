import { Archive, Book, Clock, Edit, GraduationCap, Megaphone, Users } from "lucide-react";
import AdminLayout from "../../Layouts/AdminLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { ScrollArea } from "@/components/ui/scroll-area"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import LoadingState from "../../Components/LoadingState";
import axios from "axios";
import { API_BASE_URL } from "../../Components/api";
import moment from "moment";
import { Link } from "react-router-dom";
export default function Dashboard({ }) {

    // const [active, setActive] = useState();
    // const [archive, setArchive] = useState();
    // const [announcementCount, setAnnouncementCount] = useState();
    const [data, setData] = useState();
    const adminData = JSON.parse(localStorage.getItem('admin'));
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard`, {
                    params: {
                        id: adminData.id
                    }
                });

                setData(response.data);
                // setArchive(response.data.archive_count); // Assuming response has a 'data' key
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching employment status:", error);
            }
        };

        fetchDashboardData();
    }, []);
    return (
        <>
            <AdminLayout breadcrumb={
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                Home
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>

                </>
            }>
                {data ? (
                    <>
                        <div className="lg:flex gap-4 items-start">
                            <div className="w-full">
                                <h1 className="font-semibold text-2xl mb-4">Dashboard</h1>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Alumni</CardTitle>
                                                <Users size={20} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-start w-full">
                                                <p className="font-bold text-3xl">{data.active_count || 0}</p>

                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Announcements</CardTitle>
                                                <Megaphone size={20} />
                                            </div>

                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-start w-full">
                                                <p className="font-bold text-3xl">{data.announcement_count || 0}</p>

                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Courses</CardTitle>
                                                <Book size={20} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-start w-full">
                                                <p className="font-bold text-3xl">{data.courses_count || 0}</p>

                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Archived</CardTitle>
                                                <Archive size={20} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-start w-full">
                                                <p className="font-bold text-3xl">{data.archive_count || 0}</p>

                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>

                                <div className="lg:flex gap-4 space-y-4 lg:space-y-0">
                                    <Card className="lg:w-2/3">
                                        <CardHeader className="">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>Latest Announcements</CardTitle>
                                                <Link to="/admin/announcements/active">
                                                    <Button variant="" size="sm">View</Button>
                                                </Link>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4 ">
                                                {data.announcements?.map(a => (
                                                    <>
                                                        <div className="flex items-start gap-2 mt-2 text-sm">
                                                            <Badge variant="outline">{a.status}</Badge>
                                                            <div>
                                                                <p className="font-bold">{a.announcement_title} </p>
                                                                <p className="italic ">{moment(a.start_date).format('MMMM DD, YYYY')} - {moment(a.end_date).format('MMMM DD, YYYY')}</p>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                    </>
                                                ))}


                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="lg:w-2/5">
                                        <CardHeader className="">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Courses Information</CardTitle>
                                                    <CardDescription>Check alumni count per course.</CardDescription>
                                                </div>
                                                {/* <Link to="/admin/announcements/active">
                                                    <Button variant="" size="sm">View</Button>
                                                </Link> */}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="h-64 overflow-y-auto no-scrollbar">
                                            <div className="space-y-4 ">
                                                {data.courses_details?.map(a => (
                                                    <>
                                                        <div className="flex items-start gap-2 mt-2 text-sm">

                                                            <div className="flex w-full  justify-between items-center">
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline">{a.course_code} </Badge>
                                                                    <p className="font-semibold truncate text-ellipsis w-3/4">{a.course_name} </p>

                                                                </div>
                                                                <p className="font-bold text-xl">{a.users_count}</p>

                                                            </div>
                                                        </div>

                                                    </>
                                                ))}





                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                            <div className="hidden xl:block xl:w-1/3 h-[calc(100vh-104px)]  sticky top-20 space-y-4">
                                <Card className="bg-primary text-background dark:bg-background dark:text-foreground">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Personal Information</CardTitle>

                                            </div>
                                            <Link to="/admin/account">
                                                <Edit size={20} />
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex gap-4 items-center">
                                        <Avatar className="size-24 text-foreground">
                                            <AvatarImage src={adminData && adminData.image} />
                                            <AvatarFallback>{adminData.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h1 className="font-bold">{adminData.name}</h1>
                                            <p>{adminData.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="h-[calc(100vh-310px)]">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Audit Trail</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative overflow-y-auto no-scrollbar">
                                        <ScrollArea className="h-[550px] w-[350px]">
                                            <div className="space-y-4">
                                                {data.logs?.map(a => (
                                                    <>
                                                        <div className="flex items-start gap-2 mt-2 text-sm">

                                                            <div>
                                                                <p className="font-bold">{a.title} </p>
                                                                <p className="mb-2">{a.description}</p>
                                                                <p className="font-light italic">{moment(a.created_at).format('MMMM DD, YYYY')}</p>
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                    </>
                                                ))}
                                            </div>

                                        </ScrollArea>

                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </>
                ) : (
                    <LoadingState />
                )}
            </AdminLayout>
        </>
    )
}