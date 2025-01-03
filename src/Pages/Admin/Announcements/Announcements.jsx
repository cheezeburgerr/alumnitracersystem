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
import { columns } from "./columns";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/data-table";
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { Plus, Variable } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import CalendarDateRangePicker from "../../../Components/CalendarRangePicker";
import { Textarea } from "@/Components/ui/textarea";
import { useForm } from "react-hook-form";

import { toast } from "../../../hooks/use-toast";

export default function Announcements() {
    const [data, setData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [selectedDateRange, setSelectedDateRange] = useState({ from: '', to: '' });

    const adminData = JSON.parse(localStorage.getItem('admin'));

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

    // Update with your API base URL

    const onSubmit = (formData) => {
        // Combine formData with the selected date range
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

        // Handle form submission with axios POST request
        axios
            .post(`${API_BASE_URL}/announcements`, dataToSubmit) // Replace with your API endpoint
            .then((response) => {
                // Handle the successful response here
                toast({
                    title: "Announcement created successfully.",
                    description: new Date().toString(),
                  });
                // console.log("Announcement added successfully:", response.data);
                setIsDialogOpen(false);
            })
            .catch((error) => {
                // Handle errors here
                toast({
                    title: "Failed to create new announcement.",
                    description: new Date().toString(),
                    variant: 'destructive',
                  });
                console.error("Error submitting announcement:", error);
            });
    };


    return (
        <>
            <AdminLayout
                pageName={"Announcements"}
                breadcrumb={
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>Announcements</BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Active</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
                addButton={
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus /> Add
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Announcement</DialogTitle>
                                <DialogDescription>
                                    Please fill out the form to add a new announcement.
                                </DialogDescription>
                            </DialogHeader>
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

                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                }
            >
                <DataTable columns={columns({ data, setData })} data={data} getColumn={"announcement_title"} />
            </AdminLayout>
        </>
    );
}
