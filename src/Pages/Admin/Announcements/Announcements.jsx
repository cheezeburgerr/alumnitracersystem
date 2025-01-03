import { useEffect, useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { columns } from "./columns";

import { DataTable } from "@/Components/data-table";
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";

export default function Announcements() {
    const [data, setData] = useState([]);

    useEffect(() => {

        axios
            .get(`${API_BASE_URL}/announcements`)
            .then((response) => {
                console.log(response.data)
                setData(response.data.announcements);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <>
            <AdminLayout pageName={'Announcements'} breadcrumb={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Announcements
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Active</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            }>
                <DataTable columns={columns({ data, setData })} data={data} getColumn={'announcement_title'}/>
            </AdminLayout>
        </>
    )
}