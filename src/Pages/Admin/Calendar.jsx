import AdminLayout from "../../Layouts/AdminLayout";
import { Calendar } from "@/components/ui/calendar"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import ContinuousCalendar from "../../Components/ContinuousCalendar";

export default function HomeCalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <AdminLayout pageName={'Calendar'} breadcrumb={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Home
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Calendar</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }>
                <div className="lg:flex gap-2 items-start">
                    <div className="w-full">
                        {/* <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        /> */}




                        <Card>

                            <CardContent>
                                <div className="relative overflow-auto ">
                                    <ContinuousCalendar />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Announcements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full">
                                    <p className="text-center">No events found.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}