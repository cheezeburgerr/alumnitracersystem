import { Separator } from "@/Components/ui/separator"


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
import { toast } from "../../hooks/use-toast";
import Settings from "./Settings";

// Schema
const profileFormSchema = z.object({
  password: z.string().min(2, { message: "First name must be at least 8 characters." }),
  new_password: z.string().min(2, { message: "Email must be at least 8 characters." }),
});


export default function SecurityPage() {

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

  const onSubmit = async (data) => {
    console.log("Form data submitted: ", data);
    
    try {
      const response = await axios.put(`${API_BASE_URL}/user/change_password/${user2.id}`, data);
      
      toast({
        title: response.data.message,
        description: new Date().toString(),
      });
      
      console.log("Password changed successfully", response.data);
    } catch (error) {
      // Extract error message, falling back to a generic message
      const errorMessage = error.response?.data?.message || "An error occurred";
      
      toast({
        variant: "destructive",
        title: errorMessage,
        description: new Date().toString(),
      });
      
      console.error("Error changing password:", error);
    }
  };
  

  // If user data is not loaded, show loading state


  return (
    <Settings>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Security and Log In</h3>
          <p className="text-sm text-muted-foreground">
            Change your password anytime.
          </p>
        </div>
        <Separator />
        {userData ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Contact Number Field */}

              {/* Sex Radio Fields */}


              <Button type="submit">Update Password</Button>
            </form>
          </Form>
        ) : (
          <LoadingState/>
        )}
      </div>
    </Settings>
  )
}