

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



export default function OfficialList() {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await getData();
    //         setData(result);
    //     }

    //     fetchData();
    // }, []);

    useEffect(() => {
      
        axios
          .get(`${API_BASE_URL}/users`)
          .then((response) => {
      
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      }, []);

    return (
        <AdminLayout pageName="Official List" breadcrumb={
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
        }>

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
