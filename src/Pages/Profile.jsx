import AlumniLayout from "../Layouts/AlumniLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { API_BASE_URL } from "../Components/api";
import { Edit, Eye } from "lucide-react";

export default function Profile() {
    const [status, setStatus] = useState("Employed");

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
    // console.log(employmentHistory);
    return (
        <AlumniLayout>
            <div className="md:flex gap-4 items-start space-y-4 md:space-y-0">
                <Card className="md:w-1/3">
                    <CardHeader />
                    <CardContent>
                        <div className="text-center flex flex-col justify-center items-center">
                            <img
                                src="./src/assets/profile_placeholder.png"
                                alt="Profile"
                                className="h-36"
                            />
                            <h1 className="font-bold text-2xl mt-2">
                                {user?.first_name} {user?.last_name}
                            </h1>
                            {/* <Badge
                                variant={
                                    user?.employment_status?.status?.status === "Employed"
                                        ? "default"
                                        : "destructive"
                                }
                            >
                                {user?.employment_status?.status?.status || "Unknown"}
                            </Badge> */}
                            <Badge variant="outline">{user?.student_ID}</Badge>
                        </div>
                    </CardContent>
                </Card>
                <div className="w-full space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>Personal Details</CardTitle>
                                <Link to="/profile/edit">
                                    <Edit size={20} />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <table className="text-left w-full text-sm">
                                <tbody>
                                    <tr className="border-b">
                                        <th>Sex</th>
                                        <td className="py-2">{user?.sex || "Not specified"}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th>Email</th>
                                        <td className="py-2">{user?.email || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th>Contact Number</th>
                                        <td className="py-2">{user?.contact_number || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th>Birthday</th>
                                        <td className="py-2">
                                            {user?.birthday
                                                ? moment(user.birthday).format("MMMM D, YYYY")
                                                : "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th>Address</th>
                                        <td className="py-2">{user?.address || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th>Civil Status</th>
                                        <td className="py-2">{user?.civil_status || "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>Employment Status</CardTitle>
                                <Link to={'/profile/employment-history'}>
                                <button className="text-primary text-sm font-bold">
                                    View History
                                </button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
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
                                            to={`/profile/employment-details/${user?.employment_status?.id}`}
                                            className="font-bold text-sm"
                                        >
                                            <Button className="flex gap-1 items-center" size="sm" variant="outline">
                                                <Eye/>View
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
        </AlumniLayout>
    );
}
