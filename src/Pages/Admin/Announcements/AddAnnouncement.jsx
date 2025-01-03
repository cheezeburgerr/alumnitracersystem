import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/Components/ui/calendar"; // Assuming Calendar is imported from Shadcn
import { Button } from "@/Components/ui/button"; 
import { Input } from "@/Components/ui/input"; 
import { Textarea } from "@/Components/ui/textarea"; 
import AdminLayout from "../../../Layouts/AdminLayout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { useState } from "react";

// Zod schema for form validation
const announcementSchema = z.object({
    announcement_title: z.string().min(3, "Title must be at least 3 characters"),
    start_date: z.date().nullable().refine(val => val !== null, "Start date is required"),
    end_date: z.date().nullable().refine((val, ctx) => {
        // Only perform the check if start_date is available
        if (val && ctx.parent.start_date) {
            if (val < ctx.parent.start_date) {
                return false;
            }
        }
        return true;
    }, "End date must be after start date"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});


const AddAnnouncement = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(announcementSchema),
    });

    const watchStartDate = watch("start_date");
    const watchEndDate = watch("end_date");

    // Submit handler
    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        // Submit your form here (e.g., API call)
    };

    // Handle calendar date change
    const handleDateChange = (name, date) => {

        console.log(date)
        setValue(name, date);
    };

    // const [date, setDate] = useState(new Date());
    return (
        <AdminLayout pageName={'Announcements'} breadcrumb={
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>Announcements</BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbLink href="/admin/announcements/active">Active</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>Add Announcement</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Announcement Title */}
                <div>
                    <label htmlFor="announcement_title" className="block">Announcement Title</label>
                    <Input
                        id="announcement_title"
                        {...register("announcement_title")}
                        className="input"
                    />
                    {errors.announcement_title && (
                        <p className="text-red-500 text-sm">{errors.announcement_title.message}</p>
                    )}
                </div>

                {/* Start Date */}
                <div>
                    <label htmlFor="start_date" className="block">Start Date</label>
                    <Calendar
                    mode="single"
                        selected={watchStartDate || null}  // Use watch to track selected date
                        onSelect={(date) => handleDateChange("start_date", date)}
                    />
                    {errors.start_date && (
                        <p className="text-red-500 text-sm">{errors.start_date.message}</p>
                    )}
                </div>

                {/* End Date */}
                <div>
                    <label htmlFor="end_date" className="block">End Date</label>
                    <Calendar
                    mode="single"
                        selected={watchEndDate || null}  // Use watch to track selected date
                        onSelect={(date) => handleDateChange("end_date", date)}
                    />
                    {errors.end_date && (
                        <p className="text-red-500 text-sm">{errors.end_date.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block">Description</label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        className="textarea"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit">Add Announcement</Button>
            </form>
        </AdminLayout>
    );
};

export default AddAnnouncement;
