"use client"
import React, { useState } from 'react';
import { Check, Star, ArrowRight, Users, BookOpen, Video, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import EduStreamNavbar from '../components/Navbar';

const pricingPlans = [
    {
        name: "Student",
        price: "9.99",
        period: "month",
        description: "Perfect for students starting their learning journey",
        features: [
            "Access to basic courses",
            "HD video quality",
            "Download for offline viewing",
            "Basic support",
            "1 device at a time"
        ],
        icon: BookOpen,
        popular: false,
        color: "from-blue-500 to-blue-600"
    },
    {
        name: "Professional",
        price: "19.99",
        period: "month",
        description: "Best for professionals seeking career growth",
        features: [
            "All Student features",
            "Access to premium courses",
            "4K video quality",
            "Priority support",
            "2 devices at a time",
            "Course certificates",
            "Live Q&A sessions"
        ],
        icon: Video,
        popular: true,
        color: "from-purple-500 to-indigo-600"
    },
    {
        name: "Enterprise",
        price: "49.99",
        period: "month",
        description: "For teams and organizations",
        features: [
            "All Professional features",
            "Unlimited course access",
            "Team management",
            "Custom learning paths",
            "Unlimited devices",
            "24/7 priority support",
            "API access",
            "Custom branding"
        ],
        icon: Award,
        popular: false,
        color: "from-indigo-500 to-purple-600"
    }
];

export default function PricingPage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePurchase = async (plan) => {
        setIsProcessing(true);
        setSelectedPlan(plan);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success(`Successfully subscribed to ${plan.name} plan!`, {
            duration: 4000,
            icon: '🎉',
            style: {
                background: '#10B981',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
        });

        setIsProcessing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <EduStreamNavbar />
            
            {/* Hero Section */}
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Choose Your Learning Path
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Unlock your potential with our flexible pricing plans. 
                        Start learning today and transform your career.
                    </motion.p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                                plan.popular ? 'ring-2 ring-purple-500' : ''
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                <div className="flex items-center mb-6">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${plan.color} text-white`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="ml-4 text-2xl font-bold text-gray-900">{plan.name}</h3>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                        <span className="ml-2 text-gray-500">/{plan.period}</span>
                                    </div>
                                    <p className="mt-2 text-gray-600">{plan.description}</p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handlePurchase(plan)}
                                    disabled={isProcessing && selectedPlan === plan}
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                                        isProcessing && selectedPlan === plan
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : `bg-gradient-to-r ${plan.color} hover:shadow-lg`
                                    }`}
                                >
                                    {isProcessing && selectedPlan === plan ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            Get Started
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </div>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Why Choose EduStream?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">50,000+ Students</h3>
                            <p className="text-gray-600">Join our growing community of learners worldwide</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="currentColor" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">4.9/5 Rating</h3>
                            <p className="text-gray-600">Consistently rated as one of the best learning platforms</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <Zap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Access</h3>
                            <p className="text-gray-600">Start learning immediately after subscription</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
