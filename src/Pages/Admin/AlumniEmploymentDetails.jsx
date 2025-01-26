
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AlumniDetailsReport from "../../Pages/Reports/AlumniDetailsReport";
import axios from "axios";
import { API_BASE_URL } from "../../Components/api";
import { useParams } from "react-router-dom";
import LoadingState from "../../Components/LoadingState";
import moment from "moment";
import AdminLayout from "../../Layouts/AdminLayout";
import { Button } from "@/Components/ui/button";
export default function AlumniEmploymentDetails({ userId }) {
    const [employmentData, setEmploymentData] = useState(null);
    const [status, setStatus] = useState(null);

    const [company, setCompany] = useState();
    const [jobtype, setJobType] = useState();
    const [position,setPosition] = useState();
    const [userData,setUserData] = useState();
    const [reportData,setReportData] = useState([])

    const { id } = useParams();
    useEffect(() => {
        const fetchEmploymentDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/useremploymentstatus/${id}`);
                const answerData = response.data.answers.map((item) => ({
                    question: item.question.questions,
                    answer: Array.isArray(item.answer) ? item.answer : [item.answer]
                  }))

                const groupedAnswers = answerData.reduce((acc, { question, answer }) => {
                    // Find if the question already exists in the accumulator
                    const existing = acc.find(item => item.question === question);
                    
                    if (existing) {
                      // If question exists, push the answer into the array
                      existing.answer.push(...answer);
                    } else {
                      // If not, create a new entry with the question and answer
                      acc.push({ question, answer });
                    }
                    return acc;
                  }, []);
                setReportData(groupedAnswers);
                  
                  
                setEmploymentData(response.data);
                setStatus(response.data?.status?.status);
                setUserData(response.data?.user)
                setCompany(response.data?.answers.find(answer => answer.employment_questions_ID == 3)?.answer)
                setJobType(response.data?.answers.find(answer => answer.employment_questions_ID == 2)?.answer)
                setPosition(response.data?.answers.find(answer => answer.employment_questions_ID == 16)?.answer);

                // console.log(response.data.answers.find(answer => answer.employment_questions_ID == 3))
            } catch (error) {
                console.error("Error fetching employment details:", error);
            }
        };

        fetchEmploymentDetails();
    }, [id]);


    console.log(employmentData)

    return (
        <AdminLayout pageName={'Alumnus Employment Details'} breadcrumb={
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        Alumni
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/masterlist">Master List</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/admin/view-alumni/${employmentData && employmentData.user_ID}`}>Alumnus Details</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Employment Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        }
        
        addButton={
            <PDFDownloadLink
                document={<AlumniDetailsReport user={userData} data={reportData}/>}
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

            {employmentData ? (
                <Card>
                    <CardHeader>
                        {/* <h1 className="font-bold text-2xl">Employment Status</h1> */}
                    </CardHeader>
                    <CardContent>
                        {status === "Employed" && (
                            <>
                                <div className="flex gap-4 items-start pb-4 border-b mb-4">
                                    <Badge>Employed</Badge>
                                    <div>
                                        <h3 className="font-bold">{company}</h3>
                                        <div className="text-sm">
                                            <p>{jobtype}</p>
                                            <p>{position}</p>
                                            <p>{moment(employmentData.created_at).format("MMMM D, YYYY")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid  lg:grid-cols-2 gap-4">
                                    {Object.entries(
                                        employmentData.answers
                                            .sort((a, b) => a.employment_questions_ID - b.employment_questions_ID)
                                            .reduce((acc, answer) => {
                                                const questionText = answer.question.questions;
                                                if (!acc[questionText]) acc[questionText] = [];
                                                acc[questionText].push(answer);
                                                return acc;
                                            }, {})
                                    ).map(([questionText, groupedAnswers]) => (
                                        <div key={questionText} className="p-3 border-b">
                                            <h6 className="font-semibold text-sm mb-2">{questionText}</h6>

                                            {groupedAnswers.map((answer) => (
                                                <p key={answer.id}>
                                                    {answer.answer || 'No answer provided'}
                                                </p>
                                            ))}

                                        </div>
                                    ))}
                                </div>

                            </>
                        )}
                        {status === "Unemployed" && (
                            <>
                                <div className="flex gap-4 items-start pb-4 border-b">
                                    <Badge variant="red">Unemployed</Badge>
                                    <div>
                                        <h3 className="font-bold">
                                            Reason(s) for Unemployment
                                        </h3>
                                        <ul className="list-disc pl-5">
                                            {employmentData.answers.map((answer) => (
                                                <li key={answer.id}>
                                                    {answer.answer}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500">
                                            Date: {new Date(employmentData.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        {status === "Never Employed" && (
                            <>
                                <div className="flex gap-4 items-start pb-4 border-b">
                                    <Badge variant="outline">Never Employed</Badge>
                                    <div>
                                        <h3 className="font-bold">
                                            Reason(s) for Never Being Employed
                                        </h3>
                                        <ul className="list-disc pl-5">
                                            {employmentData.answers.map((answer) => (
                                                <li key={answer.id}>
                                                    {answer.answer}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500">
                                            Date: {new Date(employmentData.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <LoadingState />
            )}
        </AdminLayout>
    );
}
