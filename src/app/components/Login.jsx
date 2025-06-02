"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

// Mock user data
const MOCK_USERS = [
    { id: 1, email: 'demo@example.com', password: 'demo123', name: 'Demo User' },
    { id: 2, email: 'premium@example.com', password: 'premium123', name: 'Premium User' }
];

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState(MOCK_USERS[0].email);
    const [password, setPassword] = useState(MOCK_USERS[0].password);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleQuickLogin = (user) => {
        setEmail(user.email);
        setPassword(user.password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (user) {
            try {
                // Get token from backend
                const response = await fetch('http://localhost:8000/get-token?video_id=sample1');
                const data = await response.json();

                if (data.token) {
                    // Store token and user info
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }));

                    toast.success('Login successful!');
                    onLoginSuccess(data.token);
                    router.push('/watch');
                }
            } catch (error) {
                toast.error('Failed to get video access token');
            }
        } else {
            toast.error('Invalid email or password');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                    >
                        <Sparkles className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to EduStream
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access premium content
                    </p>
                </div>

                {/* Quick Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    {MOCK_USERS.map((user) => (
                        <motion.button
                            key={user.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuickLogin(user)}
                            className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <User className="w-4 h-4 mr-2 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign in manually</span>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-lg ${
                                isLoading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } transition-all duration-200`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="text-sm text-center text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="font-medium text-gray-700 mb-2">Demo credentials are prefilled</p>
                        <p className="text-gray-500">Click "Sign in" or use the quick login buttons above</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
} 