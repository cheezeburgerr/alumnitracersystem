import React, { useState, useEffect } from "react";
import AlumniLayout from "../Layouts/AlumniLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { API_BASE_URL } from "../Components/api";
import { toast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function EmploymentForm() {
    const [selectedStatus, setSelectedStatus] = useState(1);

    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [formData, setFormData] = useState({
        user_ID: user.id,
        answers: [],
        files: [], // New array for file inputs
    });
    console.log(formData);
    const [employmentStatus, setEmploymentStatus] = useState(null);

    const [errors, setErrors] = useState({});

    // Handle changes to form inputs
    const handleInputChange = (questionId, value) => {
        setFormData((prevData) => {
            const updatedAnswers = prevData.answers.filter((answer) => answer.id !== questionId);
            updatedAnswers.push({ id: questionId, value });
            return {
                ...prevData,
                answers: updatedAnswers,
            };
        });
    };

    const handleTextInputChange = (questionId, value) => {
        setFormData((prevState) => {
            const updatedAnswers = prevState.answers.filter((answer) => answer.id !== questionId);
            updatedAnswers.push({ id: questionId, value });
            return {
                ...prevState,
                answers: updatedAnswers,
            };
        });
    };


    const handleCheckboxChange = (field, value, isChecked) => {
        setFormData((prev) => {
            const updatedAnswers = prev.answers.filter((answer) => answer.id !== field); // Remove the previous value for this field
            let updatedValues = prev.answers.find((answer) => answer.id === field)?.value || []; // Retrieve the current values for this field

            if (isChecked) {
                // If checked, add the value to the array
                updatedValues = [...updatedValues, value];
            } else {
                // If unchecked, remove the value from the array
                updatedValues = updatedValues.filter((item) => item !== value);
            }

            updatedAnswers.push({ id: field, value: updatedValues }); // Update the answers with the new values

            return {
                ...prev,
                answers: updatedAnswers, // Return the updated form data
            };
        });
    };

    const handleFileInputChange = (questionId, file) => {
        setFormData((prevState) => {
            const updatedFiles = prevState.files.filter((fileItem) => fileItem.id !== questionId);
            updatedFiles.push({ id: questionId, value: file }); // Store the file directly in the new array
            return {
                ...prevState,
                files: updatedFiles,
            };
        });
    };


    useEffect(() => {
        const fetchEmploymentStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/employment_status`);
                setEmploymentStatus(response.data.data); // Assuming response has a 'data' key
            } catch (error) {
                console.error("Error fetching employment status:", error);
            }
        };

        fetchEmploymentStatus();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/employmentanswer`, {
                user_ID: formData.user_ID, // Include the user ID
                status: formData.status, // Include the status
                answers: formData.answers, // Include the answers array
                files: formData.files,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Check for successful response
            if (response.status !== 201) {
                throw new Error("Failed to submit form");
            }

            const data = response.data;

            toast({
                    
                title: response.data.message,
                description: new Date().toString(),
              })

              localStorage.setItem('user', JSON.stringify(response.data.data));
              navigate('/');
            console.log("Form submitted successfully:", data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Validate form data
    const validateForm = () => {
        const formErrors = {};

        // Validate radio buttons and text inputs
        employmentStatus.find(status => status.id === selectedStatus)?.questions.forEach((question) => {
            // For radio button and checkbox questions
            if (question.question_type === "radio" && !formData.answers.find(answer => answer.id === question.id)) {
                formErrors[question.id] = "This field is required.";
            }
            if (question.question_type === "checkbox" && !(formData.answers.find(answer => answer.id === question.id)?.value?.length > 0)) {
                formErrors[question.id] = "Please select at least one option.";
            }
            // For text fields
            if (question.question_type === "text" && !formData.answers.find(answer => answer.id === question.id)) {
                formErrors[question.id] = "This field is required.";
            }
            // For file upload
            if (question.question_type === "file" && !formData.files.find(answer => answer.id === question.id)) {
                formErrors[question.id] = "Please upload a file.";
            }
        });

        return formErrors;
    };

    // Effect to keep formData in sync with selected status
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            status: selectedStatus,
        }));
    }, [selectedStatus]);

    return (
        <AlumniLayout>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <h1 className="font-bold text-2xl mb-4">Employment Form</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Please fill up all the necessary details.</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Current Employment Status</Label>
                        <RadioGroup
                            value={selectedStatus}
                            className="grid grid-cols-2 gap-4"
                            onValueChange={(value) => setSelectedStatus(value)}
                        >
                         {employmentStatus &&
    employmentStatus
        .filter(status => status.status !== "NeverEmployed") 
        .map(status => (
            <div key={status.id}>
                <RadioGroupItem value={status.id} id={status.status} className="peer sr-only" />
                <Label
                    htmlFor={status.status}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
                >
                    {status.status}
                </Label>
            </div>
        ))}

                        </RadioGroup>
                    </CardContent>
                </Card>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>
                            {selectedStatus === 1
                                ? "Employed Details"
                                : selectedStatus === 2
                                    ? "Unemployed Details"
                                    : "Never Employed Details"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {employmentStatus && employmentStatus.find(status => status.id === selectedStatus)?.questions.map((question, index) => (
                            <div key={index} className="mb-4 mt-4 space-y-2">
                                <Label> {index+1}. {question.questions}</Label>
                           
                                {question.question_type === "text" && (
                                    <Input
                                        type="text"
                                        value={formData.answers.find(answer => answer.id === question.id)?.value || ""} // Use question.id to retrieve the value
                                        onChange={(e) =>
                                            handleTextInputChange(question.id, e.target.value)
                                        }
                                    />
                                )}
                                {question.question_type === "file" && (
                                    <Input
                                        type="file"
                                        onChange={(e) => handleFileInputChange(question.id, e.target.files[0])}
                                    />
                                )}

                                {question.question_type === "radio" && (
                                    <RadioGroup
                                        value={formData.answers.find(answer => answer.id === question.id)?.value || ""}
                                        onValueChange={(value) => handleInputChange(question.id, value)}
                                    >
                                        {question.answers.map((answer, i) => (
                                            <div key={i} className="flex items-center gap-2 ms-2">
                                                <RadioGroupItem
                                                    value={answer.choices}
                                                    id={`${answer.choices}-${i}`}
                                                    checked={formData.answers.find(answer => answer.id === question.id)?.value === answer.choices}
                                                />
                                                <Label htmlFor={`${answer.choices}-${i}`}>{answer.choices}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}

                                {question.question_type === "checkbox" && (
                                    <div className="space-y-2">
                                        {question.answers.map((answer, i) => (
                                            <div key={i} className="flex items-center gap-2 ms-2">
                                                <Checkbox
                                                    id={`${answer.choices}-${index}`}
                                                    checked={formData.answers.find(answer => answer.id === question.id)?.value?.includes(answer.choices) || false}
                                                    onCheckedChange={(checked) =>
                                                        handleCheckboxChange(
                                                            question.id,
                                                            answer.choices,
                                                            checked
                                                        )
                                                    }
                                                />
                                                <Label htmlFor={`${answer.choices}-${index}`}>{answer.choices}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors[question.id] && (
                                    <div className="text-red-500 text-sm">*{errors[question.id]}</div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex justify-between items-center my-4">
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setFormData({ answers: [] })}>
                        Reset
                    </Button>
                </div>
            </form>
        </AlumniLayout>
    );
}
