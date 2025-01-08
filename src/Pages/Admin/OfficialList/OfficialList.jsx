import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { API_BASE_URL } from '@/Components/api'; 
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "../../../hooks/use-toast";

export default function OfficialList() {
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Loading state
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/official_list`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a CSV file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true); // Start loading

        axios.post(`${API_BASE_URL}/upload-csv`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                toast({
                    title: 'Alumni Successfully Inserted',
                    description: 'Alumni from the CSV file stored successfully.',
                });
                setData(response.data.data); // Refresh the data after upload
                setIsDialogOpen(false); // Close the dialog
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                alert("Failed to upload file.");
            })
            .finally(() => {
                setIsUploading(false); // Stop loading
            });
    };

    return (
        <AdminLayout
            pageName="Official List"
            breadcrumb={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Information
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Official List</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
            addButton={
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Upload CSV</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload CSV File</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input type="file" accept=".csv" onChange={handleFileChange} />
                            <Button 
                                onClick={handleUpload} 
                                variant="secondary" 
                                disabled={isUploading} // Disable button when uploading
                            >
                                {isUploading ? "Uploading..." : "Upload"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            }
        >
            {data.length > 0 ? (
                <DataTable columns={columns} data={data} />
            ) : (
                <div>
                    <p>Reading your CSV file.</p>
                </div>
            )}
        </AdminLayout>
    );
}
