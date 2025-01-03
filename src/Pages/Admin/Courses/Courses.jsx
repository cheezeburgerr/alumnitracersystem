
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { API_BASE_URL } from '@/Components/api';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useForm } from "react-hook-form";
import { Plus, Variable } from "lucide-react";
import { toast } from "../../../hooks/use-toast";

import { Button } from "@/Components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useNavigate } from "react-router-dom";
export default function Courses() {
    const [data, setData] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const adminData = JSON.parse(localStorage.getItem('admin'));
    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get(`${API_BASE_URL}/courses`)
            .then((response) => {

                setData(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);


    const onSubmit = (formData) => {
       
        const dataToSubmit = {
            ...formData,
            user_ID: adminData.id,
        };
    
      
        axios
            .post(`${API_BASE_URL}/courses`, dataToSubmit) 
            .then((response) => {

                const newCourse = {
                    ...response.data.data, 
                    created_at: new Date().toISOString(), // Add the current timestamp
                };
    
                // Update the `data` variable with the new course
                setData((prevData) => [...prevData, newCourse]);
    
                // Display success toast
                toast({
                    title: "Course created successfully.",
                    description: "A new course has been added.",
                });
    
                setIsDialogOpen(false);
            })
            .catch((error) => {
                // Handle errors here
                toast({
                    title: "Failed to create new course.",
                    description: "Please check the form and try again.",
                    variant: 'destructive',
                });
                console.error("Error submitting course:", error);
            });
    };
    
    return (
        <AdminLayout pageName="Programs" breadcrumb={
            <>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Information
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Programs</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>

            </>
        } addButton={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus /> Add
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Program</DialogTitle>
                        <DialogDescription>
                            Please fill out the form to add a new announcement.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="course_name">Course Name</Label>
                            <Input
                                id="course_name"
                                {...register("course_name", { required: true })}
                                placeholder="Course name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="course_code">Course Code</Label>
                            <Input
                                id="course_code"
                                {...register("course_code", { required: true })}
                                placeholder="Course name"
                            />
                        </div>



                       

                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        }>

            <DataTable columns={columns({ data, setData })} data={data} getColumn="course_name"  />
        </AdminLayout>

    );
}
