import AlumniLayout from "../Layouts/AlumniLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { API_BASE_URL  } from "../Components/api";
import { useParams } from "react-router-dom";
import LoadingState from "../Components/LoadingState";
import moment from "moment";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "../hooks/use-toast";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AlumniDetailsReport from "./Reports/AlumniDetailsReport";

export default function EmploymentDetails({ userId }) {
    const [employmentData, setEmploymentData] = useState(null);
    const [status, setStatus] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, setValue, reset } = useForm();

    const [company, setCompany] = useState();
    const [jobtype, setJobType] = useState();
    const [position, setPosition] = useState();
    const [question, setQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [userData,setUserData] = useState();
    const [reportData,setReportData] = useState([])


    const [updated, setUpdated] = useState();
    const { id } = useParams();


    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

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
                setCompany(response.data?.answers.find(answer => answer.employment_questions_ID == 3)?.answer);
                setPosition(response.data?.answers.find(answer => answer.employment_questions_ID == 16)?.answer);
                setJobType(response.data?.answers.find(answer => answer.employment_questions_ID == 2)?.answer);
                setUserData(response.data?.user);

                // Pre-fill selected answers
                const prefilledAnswers = {};

                // Loop through each answer and group them by employment_questions_ID
                response.data.answers.forEach(answer => {
                    if (!prefilledAnswers[answer.employment_questions_ID]) {
                        prefilledAnswers[answer.employment_questions_ID] = [];
                    }
                    prefilledAnswers[answer.employment_questions_ID].push(answer.answer);
                });
                
                console.log(prefilledAnswers);
                
                setSelectedAnswer(prefilledAnswers);
                console.log('answers',prefilledAnswers)
            } catch (error) {
                console.error("Error fetching employment details:", error);
            }
        };

        fetchEmploymentDetails();
    }, [id, isDialogOpen]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/employmentquestions/16`);
                setQuestion(response.data);
            } catch (error) {
                console.error("Error fetching employment details:", error);
            }
        };

        fetchQuestion();
    }, []);

    const handleInputChange = (newValue) => {
        setSelectedAnswer((prev) => ({
            ...prev, // Spread the previous state
            16: [newValue] // Update index 16
        }));
    };
    

    const onSubmit = async () => {
        try {
            await axios.post(`${API_BASE_URL}/employmentanswer`,
            {
                user_ID: user.id,
                status: 1,
                answers:  Object.keys(selectedAnswer).map(key => ({
                    id: parseInt(key),  // Convert key back to integer (index as ID)
                    value: selectedAnswer[key] // Set array as value
                })),
                "files": [
                  {
                    "id": 4,
                    "value": "file1.pdf"
                  }
                ]
              }
        );

            setIsDialogOpen(false);
            toast({
                title: "Position Updated.",
                description: new Date().toString()
            })
        } catch (error) {
            console.error("Error updating position:", error);
            toast({
                title: "Position Updated.",
                description: new Date().toString()
            })
        }
    };

    return (
        <AlumniLayout   
        
        >
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Employment Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

          

            {employmentData ? (
                <Card>
                    <CardHeader>
                        <div className="flex justify-between w-full items-center">
                            <h1 className="font-bold text-2xl">Employment Status</h1>
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
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    {status == "Employed" && (
                                        <Button size="sm">
                                        Promote
                                    </Button>
                                    )}
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Promote Position</DialogTitle>
                                        <DialogDescription>
                                            Please fill out the form to update your position.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                                        {question && (
                                            <>
                                                <Label>{question.questions}</Label>
                                                <RadioGroup
                                                    value={selectedAnswer["16"][0] || ""}
                                                    onValueChange={(value) =>
                                                        handleInputChange(value)
                                                    }
                                                >
                                                    {question.answers &&
                                                        question.answers.map((answer, i) => (
                                                            <div key={i} className="flex items-center gap-2 ms-2">
                                                                <RadioGroupItem
                                                                    value={answer.choices}
                                                                    id={`${answer.choices}-${i}`}
                                                                    checked={
                                                                        selectedAnswer['16'][0] ===
                                                                        answer.choices
                                                                    }
                                                                />
                                                                <Label htmlFor={`${answer.choices}-${i}`}>
                                                                    {answer.choices}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                </RadioGroup>
                                            </>
                                        )}

                                        <DialogFooter>
                                            <Button type="submit">Submit</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
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
                                <div className="grid lg:grid-cols-2 gap-4">
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
                questionText === "Upload your company ID" ? (
                    <img
                        key={answer.id}
                        src={`${answer.answer}`}
                        alt="Company ID"
                        className="w-44 h-44 mx-auto rounded-lg" // Add any styling as needed
                    />
                ) : (
                    <p key={answer.id}>
                        {answer.answer || "No answer provided"}
                    </p>
                )
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
                                        <h3 className="font-bold">Reason(s) for Unemployment</h3>
                                        <ul className="list-disc pl-5">
                                            {employmentData.answers.map((answer) => (
                                                <li key={answer.id}>{answer.answer}</li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500">
                                            Date:{" "}
                                            {new Date(employmentData.created_at).toLocaleDateString()}
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
                                        <h3 className="font-bold">Reason(s) for Never Being Employed</h3>
                                        <ul className="list-disc pl-5">
                                            {employmentData.answers.map((answer) => (
                                                <li key={answer.id}>{answer.answer}</li>
                                            ))}
                                        </ul>
                                        <p className="text-sm text-gray-500">
                                            Date:{" "}
                                            {new Date(employmentData.created_at).toLocaleDateString()}
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
        </AlumniLayout>
    );
}

