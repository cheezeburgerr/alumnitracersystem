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

export default function OfficialList() {
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);

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

        axios.post(`${API_BASE_URL}/upload-csv`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                alert("File uploaded successfully!");
                // Optionally refresh the data after upload
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                alert("Failed to upload file.");
            });
    };

    return (
        <AdminLayout
            pageName="Official List"
            breadcrumb={
                <>
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
                </>
            }
            addButton={
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Upload CSV</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload CSV File</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input type="file" accept=".csv" onChange={handleFileChange} />
                            <Button onClick={handleUpload} variant="secondary">Upload</Button>
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
