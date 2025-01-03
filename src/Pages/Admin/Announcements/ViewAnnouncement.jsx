import { useEffect, useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/Components/ui/button";

import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import CalendarDateRangePicker from "../../../Components/CalendarRangePicker";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "react-hook-form";

import { toast } from "../../../hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewAnnouncement() {
    const [data, setData] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [selectedDateRange, setSelectedDateRange] = useState({ from: '', to: '' });

    const adminData = JSON.parse(localStorage.getItem('admin'));

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/announcements/${id}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data.announcements);
                reset({
                    announcement_title: response.data.announcements.announcement_title,
                    description: response.data.announcements.description,
                });
                setSelectedDateRange({
                    from: response.data.announcements.start_date,
                    to: response.data.announcements.end_date,
                });
            })
            .catch((error) => {
                console.error("Error fetching announcements:", error);
            });
    }, [id, reset]);

    const onSubmit = (formData) => {
        // Helper function to format the date to YYYY-MM-DD
        const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split('T')[0]; // Get the date part (YYYY-MM-DD)
        };
    
        // Combine formData with the selected date range
        const dataToSubmit = {
            ...formData,
            start_date: selectedDateRange.from ? formatDate(selectedDateRange.from) : '',
            end_date: selectedDateRange.to ? formatDate(selectedDateRange.to) : '',
            user_ID: adminData.id,
        };
    
        // console.log(dataToSubmit); // Check the output in the console
    
        // Handle form submission with axios PUT request
        axios
            .put(`${API_BASE_URL}/announcements/${id}`, dataToSubmit) // Update the announcement
            .then((response) => {
                // Handle the successful response here
                toast({
                    title: "Announcement updated successfully.",
                    description: new Date().toString(),
                });

                navigate(-1);
            })
            .catch((error) => {
                // Handle errors here
                toast({
                    title: "Failed to update announcement.",
                    description: new Date().toString(),
                    variant: 'destructive',
                });
                console.error("Error updating announcement:", error);
            });
    };
    

    return (
        <>
            <AdminLayout
                pageName={"Edit Announcement"}
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>Announcements</BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
            >
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="announcement_title">Title</Label>
                        <Input
                            id="announcement_title"
                            {...register("announcement_title", { required: true })}
                            placeholder="Title"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date_range">Date Range</Label>
                        <CalendarDateRangePicker
                            className="my-class"
                            setSelectedDateRange={setSelectedDateRange}
                            initialSelectedDateRange={selectedDateRange}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description", { required: true })}
                            placeholder="Enter description"
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </AdminLayout>
        </>
    );
}
