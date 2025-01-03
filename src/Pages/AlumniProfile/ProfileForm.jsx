import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { toast } from "../../hooks/use-toast";

// Schema
const profileFormSchema = z.object({
    first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
    middle_name: z.string().optional(),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    birthday: z.string().min(1, { message: "Please select a valid birthday." }),
    contact_number: z.string().min(11, { message: "Please enter a valid contact number." }),
    email: z.string().email(),
    sex: z.string().min(1, { message: "Please select a valid gender." }),
    civil_status: z.string().min(1, { message: "Please select a valid civil status." }),
});

export function ProfileForm({ id }) {
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
        resolver: zodResolver(profileFormSchema),
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
                toast({
                    
                    title: response.data.message,
                    description: new Date().toString(),
                  })

                  localStorage.setItem('user', JSON.stringify(response.data.user))
                //   console.log(response.data);
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
            });
    };

    // If user data is not loaded, show loading state
    if (!userData) {
        return <div><LoadingState/></div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="middle_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Middle Name (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Middle Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birthday</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Contact Number Field */}
                <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Contact Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Sex Radio Fields */}
                <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <RadioGroup value={field.value} onValueChange={field.onChange}>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <span>Male</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <span>Female</span>
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
                    name="civil_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Civil Status</FormLabel>
                            <FormControl>
                                <RadioGroup value={field.value} onValueChange={field.onChange}>
                                    <div className="">
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Single" id="Single" />
                                            <span>Single</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Married" id="Married" />
                                            <span>Married</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Single Parent" id="Single Parent" />
                                            <span>Single Parent</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Separated/Divorced" id="Separated/Divorced" />
                                            <span>Separated/Divorced</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Married but not living with spouse" id="Married but not living with spouse" />
                                            <span>Married but not living with spouse</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <RadioGroupItem value="Widow / Widower" id="Widow / Widower" />
                                            <span>Widow / Widower</span>
                                        </label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
}
