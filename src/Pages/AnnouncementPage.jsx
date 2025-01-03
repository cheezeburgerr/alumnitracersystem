import AlumniLayout from "@/Layouts/AlumniLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Components/api";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import moment from "moment";
import LoadingState from "../Components/LoadingState";


export default function AnnouncementPage({ }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/announcements`)
            .then((response) => {
                console.log(response.data);
                setData(response.data.announcements);
            })
            .catch((error) => {
                console.error("Error fetching announcements:", error);
            });
    }, []);
    return (
        <>
            <AlumniLayout pageName="Announcements">
                {data ? (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {data?.map(ann => (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{ann.announcement_title}</CardTitle>
                                    <CardDescription>{moment(ann.start_date).format('MMMM DD YYYY')} - {moment(ann.end_date).format('MMMM DD YYYY')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{ann.description}</p>
                                </CardContent>

                            </Card>

                        </>
                    ))}
                </div>
                    </>
                ) : (
                    <LoadingState/>
                )}

            </AlumniLayout>
        </>
    )
}