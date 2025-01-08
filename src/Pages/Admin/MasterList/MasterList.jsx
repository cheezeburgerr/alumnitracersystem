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
import { API_BASE_URL } from '@/Components/api'; 
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/Components/ui/button";
import MasterListReport from "../../../Pages/Reports/MasterListReport";


export default function DemoPage() {
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
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      }, []);

    return (
        <AdminLayout pageName="Master List" breadcrumb={
            <>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            Alumni
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Master List</BreadcrumbPage>
                        </BreadcrumbItem>
                       
                    </BreadcrumbList>
                </Breadcrumb>

            </>
        } addButton={
            <PDFDownloadLink
                document={<MasterListReport data={data} />}
                fileName="alumni_report.pdf"
            >
                {({ loading }) =>
                    loading ? (
                        <Button variant="outline" disabled>
                            Generating Report...
                        </Button>
                    ) : (
                        <Button variant="outline">Download Report</Button>
                    )
                }
            </PDFDownloadLink>
        }>

                 <DataTable columns={columns({ data, setData })} data={data} />
        </AdminLayout>

    );
}
