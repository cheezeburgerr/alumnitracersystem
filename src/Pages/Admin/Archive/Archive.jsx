// import AdminLayout from "../../../Layouts/AdminLayout";


// export default function MasterList ({}) {

//     return (

//         <>
//             <AdminLayout pageName="Master List">

//             </AdminLayout>
//         </>
//     )
// }

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/Components/data-table";
import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { API_BASE_URL } from "../../../Components/api";
async function getData() {
    // Fetch data from your API here.
    return [
        {
            student_number: "21-SC-1495",
            name: "Erjian Soriano",
            course: "Bachelor of Science in Information Technology",
            email: "m@example.com",
            status: "Employed"
        },
        {
            student_number: "21-SC-1495",
            name: "Erjissan Soriano",
            course: "Bachelor of Science in Information Technology",
            email: "m@eaaaxample.com",
            status: "Unemployed"
        },
        {
            student_number: "21-SC-1495",
            name: "Erjian Soriano",
            course: "Bachelor of Science in Information Technology",
            email: "m@example.com",
            status: "Employed"
        },

        // ...
    ];
}

export default function Archive() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('Archived');
    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await getData();
    //         setData(result);
    //     }

    //     fetchData();
    // }, []);

    useEffect(() => {
        // Fetch users with the specified status
        axios
            .get(`${API_BASE_URL}/users`, {
                params: { status }  // Add status as a query parameter
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [status]);

    return (
        <AdminLayout pageName="Archive" breadcrumb={
            <>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Alumni
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Archive</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>

            </>
        }>

            <DataTable
                columns={columns({ data, setData })} // Pass data and setData to columns
                data={data} // Pass data to DataTable
            />

        </AdminLayout>

    );
}
