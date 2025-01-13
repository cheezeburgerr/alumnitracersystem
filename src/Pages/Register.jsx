import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Link } from "react-router-dom";
import { differenceInYears } from "date-fns";
import axios from "axios";
import { API_BASE_URL } from '../Components/api';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Register({ className, ...props }) {

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    student_ID: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    birthday: "",
    email: "",
    password: "",
    address: "",
    course_ID: "",
    sex: "",
    civil_status: "",
    contact_number: ""

  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleBirthdayChange = (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, birthday: selectedDate });
    if (selectedDate) {
      const dateObject = new Date(selectedDate);
      const calculatedAge = differenceInYears(new Date(), dateObject);
      setAge(calculatedAge);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.student_ID) {
      newErrors.student_ID = "Student number is required";
      valid = false;
    }
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      valid = false;
    }
    if (!formData.middle_name) {
      newErrors.middle_name = "Middle name is required";
      valid = false;
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      valid = false;
    }
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.course_ID) {
      newErrors.course_ID = "Course is required";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!formData.sex) {
      newErrors.sex = "Sex is required";
      valid = false;
    }
    if (!formData.contact_number || formData.contact_number.length !== 11) {
      newErrors.contact_number = "Contact number must be 11 digits";
      valid = false;
    }
    if (!formData.civil_status) {
      newErrors.civil_status = "Civil status is required";
      valid = false;
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };


  useEffect(() => {


    axios
      .get(`${API_BASE_URL}/courses`)
      .then((response) => {
        setCourses(response.data);

        // setLoading(false);
        console.log(courses)
      })
      .catch((error) => {
        console.error("Error fetching courses data:", error);

      });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setApiError("");

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/users`, formData);
        console.log(response.data);
        // Redirect or show success message

        const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
          student_ID: formData.student_ID,  // Assuming formData contains the email
          password: formData.password,  // Assuming formData contains the password
        });

        // Store the Bearer token in localStorage (or use other state management methods)
        localStorage.setItem("access_token", loginResponse.data.access_token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
        console.log("Logged in successfully");

        window.location.href = "/";
      } catch (error) {
        console.error(error);
        setApiError("There was an error submitting the form.");
        setErrors(error.response.data.errors);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-primary">
      <div className="w-full md:max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="py-6">
            <Link to={"/"}>
              <div className="flex justify-center">
                <img src="./src/assets/psu_logo.png" alt="" className="h-20" />
              </div>
            </Link>

            <form onSubmit={handleSubmit} className="">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                  <p className="text-center">Fill up with your credentials.</p>
                </div>

                {apiError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="student_ID">Student Number</Label>
                  <Input
                    id="student_ID"
                    type="text"
                    placeholder="Enter your student number"
                    value={formData.student_ID}
                    onChange={handleChange}
                    className={cn(errors.student_ID ? "border-red-500" : "")}
                  />
                  {errors.student_ID && (
                    <p className="text-sm text-red-500">{errors.student_ID}</p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full grid gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={cn(errors.first_name ? "border-red-500" : "")}
                    />
                    {errors.first_name && (
                      <p className="text-sm text-red-500">{errors.first_name}</p>
                    )}
                  </div>
                  <div className="w-full grid gap-2">
                    <Label htmlFor="middle_name">Middle Name</Label>
                    <Input
                      id="middle_name"
                      type="text"
                      placeholder="Enter your middle name"
                      value={formData.middle_name}
                      onChange={handleChange}
                      className={cn(errors.middle_name ? "border-red-500" : "")}
                    />
                    {errors.middle_name && (
                      <p className="text-sm text-red-500">{errors.middle_name}</p>
                    )}
                  </div>
                  <div className="w-full grid gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={cn(errors.last_name ? "border-red-500" : "")}
                    />
                    {errors.last_name && (
                      <p className="text-sm text-red-500">{errors.last_name}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex gap-6">
                    <div className="w-full grid gap-2">
                      <Label htmlFor="birthday">Birthday</Label>
                      <Input
                        type="date"
                        value={formData.birthday}
                        onChange={handleBirthdayChange}
                        className={cn(errors.birthday ? "border-red-500" : "")}
                      />
                      {errors.birthday && (
                        <p className="text-sm text-red-500">{errors.birthday}</p>
                      )}
                    </div>
                    <div className="w-full grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Auto-calculated"
                        value={age}
                        readOnly
                        required
                      />
                    </div>
                  </div>



                </div>

                <div className="flex gap-4 w-full">
                  <div className="grid gap-2">
                    <Label htmlFor="sex">Sex</Label>
                    <div>
                      <RadioGroup
                        onValueChange={(value) => setFormData({ ...formData, sex: value })}
                        className="flex gap-4"
                      >
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </RadioGroup>
                    </div>
                    {errors.sex && <p className="text-sm text-red-500">{errors.sex}</p>}
                  </div>

                  <div className="grid gap-2 w-full">
                    <Label htmlFor="civil_status">Civil Status</Label>
                    <Select
                      onValueChange={(value) => setFormData({ ...formData, civil_status: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={formData.civil_status || "Select Civil Status"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Single Parent">Single Parent</SelectItem>
                        <SelectItem value="Separated/Divorced">Separated/Divorced</SelectItem>
                        <SelectItem value="Married but not living with spouse">Married but not living with spouse</SelectItem>
                        <SelectItem value="Widow / Widower">Widow / Widower</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.civil_status && (
                      <p className="text-sm text-red-500">{errors.civil_status}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact_number">Contact Number</Label>
                  <Input
                    id="contact_number"
                    type="tel"
                    placeholder="Enter your contact number"
                    maxLength={11}
                    value={formData.contact_number}
                    onChange={handleChange}
                    className={cn(errors.contact_number ? "border-red-500" : "")}
                  />
                  {errors.contact_number && (
                    <p className="text-sm text-red-500">{errors.contact_number}</p>
                  )}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`${cn(errors.password ? "border-red-500" : "")} w-full`}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                <div className="flex gap-4 items-center justify-between">
                  <div className="grid gap-2 w-1/2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${cn(errors.password ? "border-red-500" : "")} w-full`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="grid-gap-2 w-1/2">

                    <Label htmlFor="course_ID">Course</Label>
                    <Select
                      onValueChange={(value) => setFormData({ ...formData, course_ID: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={"Select Course"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.course_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.course_ID && (
                      <p className="text-sm text-red-500">{errors.course_ID}</p>
                    )}


                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="grid-gap-2">

                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={cn(errors.password ? "border-red-500" : "")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={cn(errors.confirmPassword ? "border-red-500" : "")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
