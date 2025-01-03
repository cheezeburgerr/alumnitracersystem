import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlumniLayout from "@/Layouts/AlumniLayout";
import axios from "axios"; // Ensure to import axios for making API requests
import { Bell, FormInput, User } from "lucide-react";
import { API_BASE_URL } from '../Components/api';

import { Badge } from "@/Components/ui/badge";

export default function Home() {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [formData, setFormData] = useState({
        student_ID: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        student_ID: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ student_ID: "", password: "" });
        setApiError("");

        // Validate the form
        let valid = true;
        const newErrors = {};

        if (!formData.student_ID) {
            newErrors.student_ID = "Student number is required";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        setErrors(newErrors);

        // If form is valid, proceed to API call
        if (valid) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, formData);

                console.log("Login successful:", response.data);
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Redirect on successful login
                window.location.href = '/';

            } catch (error) {
                setApiError("Invalid credentials or server error. Please try again.");
                console.error("Login error:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <>
            <AlumniLayout>
                {user ? (
                    <>
                        <div className="mb-4">
                            <h1 className="font-bold text-2xl">Hello {user.first_name}!</h1>
                        </div>
                        <div className="mb-4 space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-2">
                                            <CardTitle>Current Employment Status</CardTitle>
                                            <CardDescription>

                                                <Badge variant={user.employment_status && user.employment_status.status.status == 'Employed' ? 'default' : 'destructive'}>{user.employment_status && user.employment_status.status.status}</Badge>
                                            </CardDescription>
                                        </div>
                                        <Link to="/profile/employmentform"><Button>Update</Button></Link>
                                    </div>
                                </CardHeader>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4  items-center justify-center  w-full">

                            <Link>
                                <Card>

                                    <CardContent className="pt-6 flex flex-col items-start justify-between h-48">
                                        <Bell size={32} strokeWidth={1.5} />
                                        <div>
                                            <p className="font-semibold text-xl">Announcements</p>
                                            <p>Check out for upcoming events.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link to={'/profile/employmentform'}>
                                <Card>

                                    <CardContent className="pt-6 flex flex-col items-start justify-between h-48">
                                        <FormInput size={32} strokeWidth={1.5} />
                                        <div>
                                            <p className="font-semibold text-xl">Update Employment</p>
                                            <p>Update your status in employment.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link to={'/profile'}>
                                <Card>

                                    <CardContent className="pt-6 flex flex-col items-start justify-between h-48">
                                        <User size={32} strokeWidth={1.5} />
                                        <div>
                                            <p className="font-semibold text-xl">Profile</p>
                                            <p>Manage your account.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="max-w-full h-[calc(100vh-250px)] mx-auto lg:flex gap-4 items-center justify-center py-6 w-full space-y-4">
                        <div className="w-full lg:w-7/12 text-center lg:text-start">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-4">
                                Welcome PSU Alumnus
                            </h1>
                            <p className="scroll-m-20 text-xl font-semibold tracking-tight lg:w-11/12">
                                Welcome to the official Page of Pangasinan State University - San Carlos City Campus Alumni Tracer System
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Card className="w-[350px]">
                                <form onSubmit={handleSubmit}>
                                    <CardHeader className="text-center lg:text-start">
                                        <CardTitle className="font-bold text-xl">Log In</CardTitle>
                                        <CardDescription>Enter your credentials.</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                        <div className="grid w-full items-center gap-4 mb-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="student_ID">Student Number</Label>
                                                <Input
                                                    id="student_ID"
                                                    value={formData.student_ID}
                                                    placeholder="Enter student number"
                                                    onChange={handleChange}
                                                    className={cn(
                                                        errors.student_ID ? "border-red-500" : "",
                                                        "focus:ring-2 focus:ring-red-500"
                                                    )}
                                                />
                                                {errors.student_ID && (
                                                    <p className="text-sm text-red-500">{errors.student_ID}</p>
                                                )}
                                            </div>

                                        </div>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={formData.password}
                                                    placeholder="Enter password"
                                                    onChange={handleChange}
                                                    className={cn(
                                                        errors.password ? "border-red-500" : "",
                                                        "focus:ring-2 focus:ring-red-500"
                                                    )}
                                                />
                                                {errors.password && (
                                                    <p className="text-sm text-red-500">{errors.password}</p>
                                                )}
                                            </div>

                                        </div>

                                        {apiError && (
                                            <p className="text-sm text-red-500 mt-2">{apiError}</p>
                                        )}

                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? "Logging in..." : "Login"}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>
                    </div>
                )}
            </AlumniLayout>
        </>
    );
}
