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
    name: z.string().min(2, { message: "First name must be at least 2 characters." }),
    email: z.string().min(2, { message: "Email must be at least 8 characters." }),
});

export function AccountForm({ id }) {
    const [user2, setUser] = useState(() => {
        const storedUser = localStorage.getItem('admin');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user2 && user2.id) {
            axios
                .get(`${API_BASE_URL}/admins/${user2.id}`)
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
            .put(`${API_BASE_URL}/admins/${user2.id}`, data)
            .then((response) => {
                toast({
                    
                    title: response.data.message,
                    description: new Date().toString(),
                  })
                console.log("Profile updated successfully", response.data);
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: response.data.message,
                    description: new Date().toString(),
                  })
                // console.error("Error updating profile:", error);
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
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
               
                {/* Sex Radio Fields */}
                

                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
}
