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
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

export default function EmploymentHistory() {

    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing stored user:", error);
            return null;
        }
    });

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
            <AlumniLayout pageName={'Employment History'}>
               
                <Card>

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
                                            to={`/profile/employment-details/${item.id}`}
                                            className="font-bold text-sm"
                                        >
                                            <Button className="flex gap-1 items-center" size="sm" variant="outline">
                                            <Eye/> View
                                            </Button>
                                        </Link>
                                    </TimelineDescription>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </CardContent>
                </Card>
            </AlumniLayout>
        </>
    )
}