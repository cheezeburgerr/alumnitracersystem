import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../Components/api';
import LoginLayout from '../Layouts/LoginLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RequestNewLink = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            await axios.post(`${API_BASE_URL}/resend-activation-link`, { email });
            setMessage('A new activation link has been sent to your email.');
        } catch (error) {
            if (error.response) {
                // Extract error message from the response if available
                setError(error.response.data.message || 'An error occurred.');
            } else {
                setError('An error occurred while requesting a new link.');
            }
        }
    };

    return (
   
                <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-primary">
                    <div className="w-full md:max-w-lg">
                        <Card>
                            <CardHeader>
                                <CardTitle>Request New Link</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className='grid gap-2 mb-4'>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    <Button type="submit">Request Link</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {message && <p>{message}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>

    );
};

export default RequestNewLink;
