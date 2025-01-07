import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../Components/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingState from '../Components/LoadingState';

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';

const AccountActivation = () => {
    const { token } = useParams(); // Get the token from the URL
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Validate the token on page load
        const validateToken = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/validate-token`, { token });
                setMessage(response.data.message);
                setIsTokenValid(true);
            } catch (error) {
                setMessage(error.response?.data.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setMessage('Password is required.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/account/set-password`, { token, password });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after setting password
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred');
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-primary">
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    {/* <p>{message}</p> */}
                    {isTokenValid && (

                        <div className="w-full md:max-w-lg">
                            <Card>

                                <CardHeader>
                                    <CardTitle>Setup Password</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit}>
                                        <div className='grid gap-2 mb-4'>
                                            <Label htmlFor="password">New Password</Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </div>
                                        <Button type="submit">Set Password</Button>
                                    </form>
                                </CardContent>
                            </Card>


                        </div>


                    )}
                    {!isTokenValid && (

                        <Card className="text-centesr">

                            <CardHeader>

                                <CardTitle className="text-2xl ">Oops!</CardTitle>
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>Failed to activate your account.</AlertDescription>
                                </Alert>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    The activation link has expired.{' '}
                                    <button className='text-primary' onClick={() => navigate('/request-new-link')}>Request a new link</button>
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
};

export default AccountActivation;
