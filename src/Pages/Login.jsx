import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios

import { API_BASE_URL } from '../Components/api'; 
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

export default function Login({
    className,
    ...props
}) {
    const [formData, setFormData] = useState({
        student_ID: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        student_ID: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");


    let navigate = useNavigate();
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


        if (valid) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, formData);
            
                console.log('Login successful:', response.data);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
        
                console.log(localStorage.getItem('user'))
                // Redirect or take appropriate action after successful login
                window.location.href = '/';
            } catch (error) {
                setApiError('Invalid credentials or server error. Please try again.'); // Show API error
                console.error('Login error:', error);
            } finally {


                setIsLoading(false); // Reset loading state
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-primary">
            <div className="w-full max-w-sm md:max-w-lg">
                <Card className="overflow-hidden">
                    <CardContent className="py-6">
                        <Link to={"/"}>
                            <div className="flex justify-center mb-4">
                                <img src="./src/assets/psu_logo.png" alt="" className="h-20" />
                            </div>
                        </Link>

                        <form onSubmit={handleSubmit} className="">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
                                    <p className="text-center">Login in with your credentials.</p>
                                </div>
                                {apiError &&
                                    (
                                        <>
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>
                                                    {apiError}
                                                </AlertDescription>
                                            </Alert>
                                        </>
                                    )}

                                <div className="grid gap-2">
                                    <Label htmlFor="student_ID" >Student Number</Label>
                                    <Input
                                        id="student_ID"
                                        type="text"
                                        placeholder="Enter your student number"
                                        value={formData.student_ID}
                                        onChange={handleChange}
                                        className={cn(
                                            errors.student_ID ? "border-red-500" : "",
                                            "focus:ring-2 focus:ring-red-500"
                                        )}
                                    />
                                    {errors.student_ID && <p className="text-sm text-red-500">{errors.student_ID}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={cn(
                                            errors.password ? "border-red-500" : "",
                                            "focus:ring-2 focus:ring-red-500"
                                        )}
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>


                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a href="/register" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
