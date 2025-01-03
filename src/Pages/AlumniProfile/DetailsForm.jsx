import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { API_BASE_URL } from "../../Components/api";
import LoadingState from "../../Components/LoadingState";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// Schema
const detailsFormSchema = z.object({
    address: z.string().min(8, { message: "Address must be at least 8 characters." }),
    region: z.string().min(1, { message: "Please select a valid region." }),
    province: z.string().min(2, { message: "Province must be at least 2 characters." }),
    location_of_residence: z.string().min(1, { message: "Please select a valid location." }),
    educational_attainment: z.string().min(1, { message: "Please select a valid attainment." }),
    specialization: z.string().min(8, { message: "Specialization must be at least 8 characters." }),
    // college: z.string().min(2, { message: "College must be at least 2 characters." }),
    year: z.string().min(1, { message: "Please select a valid year." }),
    honors: z.string().optional(),
    exams: z.string().optional(),
    date_taken: z.string().optional(),
    rating: z.string().optional(),
});

export function DetailsForm({ id }) {
    const [user2, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user2 && user2.id) {
            axios
                .get(`${API_BASE_URL}/users/${user2.id}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user2]);

    const form = useForm({
        resolver: zodResolver(detailsFormSchema),
        defaultValues: userData,
        mode: "onChange",
    });

    useEffect(() => {
        if (userData) {
            form.reset(userData);  // Reset form data once fetched
        }
    }, [userData, form]);

    const onSubmit = (data) => {
        console.log("Form data submitted: ", data);
        // Make the API call here
        axios
            .put(`${API_BASE_URL}/users/${user2.id}`, data)
            .then((response) => {
                console.log("Profile updated successfully", response.data);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    // If user data is not loaded, show loading state
    if (!userData) {
        return <div><LoadingState /></div>;
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Region</FormLabel>
                            <FormControl>
                                <Select {...field} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Region 1">Region 1</SelectItem>
                                        <SelectItem value="Region 2">Region 2</SelectItem>
                                        <SelectItem value="Region 3">Region 3</SelectItem>
                                        <SelectItem value="Region 4">Region 4</SelectItem>
                                        <SelectItem value="Region 5">Region 5</SelectItem>
                                        <SelectItem value="Region 6">Region 6</SelectItem>
                                        <SelectItem value="Region 7">Region 7</SelectItem>
                                        <SelectItem value="Region 8">Region 8</SelectItem>
                                        <SelectItem value="Region 9">Region 9</SelectItem>
                                        <SelectItem value="Region 10">Region 10</SelectItem>
                                        <SelectItem value="Region 11">Region 11</SelectItem>
                                        <SelectItem value="Region 12">Region 12</SelectItem>
                                        <SelectItem value="NCR">NCR</SelectItem>
                                        <SelectItem value="CAR">CAR</SelectItem>
                                        <SelectItem value="ARMM">ARMM</SelectItem>
                                        <SelectItem value="CARAGA">CARAGA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <Input placeholder="Province" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location_of_residence"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <RadioGroup value={field.value} onValueChange={field.onChange}>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="City" id="City" />
                                            <span>City</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Municipality" id="Municipality" />
                                            <span>Municipality</span>
                                        </label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="educational_attainment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Educational Attainment (Baccalaureate Degree Only)</FormLabel>
                            <FormControl>
                                <Select {...field} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select educational attainment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bachelor of Elementary Education Major in General Enhanced Education">
                                            Bachelor of Elementary Education Major in General Enhanced Education
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Science in Agriculture Major in General Curriculum">
                                            Bachelor of Science in Agriculture Major in General Curriculum
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Secondary Education Major in Technology & Livelihood Education">
                                            Bachelor of Secondary Education Major in Technology & Livelihood Education
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Secondary Education Major in Social Studies">
                                            Bachelor of Secondary Education Major in Social Studies
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Secondary Education Major in Filipino">
                                            Bachelor of Secondary Education Major in Filipino
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Science in Information Technology">
                                            Bachelor of Science in Information Technology
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Science in Business Administration Major in Human Resources Development Management">
                                            Bachelor of Science in Business Administration Major in Human Resources Development Management
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Science in Hospitality Management">
                                            Bachelor of Science in Hospitality Management
                                        </SelectItem>
                                        <SelectItem value="Bachelor of Science in Office Administration">
                                            Bachelor of Science in Office Administration
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specialization</FormLabel>
                            <FormControl>
                                <Input placeholder="Specialization" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year Graduated</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="honors"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Honor(s) / Award(s) Received</FormLabel>
                            <FormControl>
                                <Input placeholder="Honors and Awards" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="exams"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Professional Examination(s) Passed</FormLabel>
                            <FormControl>
                                <Input placeholder="Professional Examination(s) Passed" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date_taken"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date Taken</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input placeholder="Rating" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Add any other fields as necessary */}
                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
}
