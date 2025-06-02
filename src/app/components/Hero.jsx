import React from 'react';
import { Play, Users, BookOpen, Star, ArrowRight } from 'lucide-react';

// Mock Framer Motion for this environment
const motion = {
    div: ({ children, initial, animate, transition, whileHover, className, ...props }) => (
        <div className={className} {...props}>{children}</div>
    ),
    h1: ({ children, initial, animate, transition, className, ...props }) => (
        <h1 className={className} {...props}>{children}</h1>
    ),
    p: ({ children, initial, animate, transition, className, ...props }) => (
        <p className={className} {...props}>{children}</p>
    ),
    button: ({ children, initial, animate, transition, whileHover, whileTap, className, ...props }) => (
        <button className={className} {...props}>{children}</button>
    )
};

export default function Hero() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/3 -left-12 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/25 to-blue-300/25 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">

                    {/* Left Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
                                <Star className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" />
                                #1 Educational Platform
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Learn
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Without </span>
                            Limits
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg"
                        >
                            Transform your learning journey with EduStream's cutting-edge video platform. Access world-class courses, expert instructors, and interactive content anytime, anywhere.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 mb-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                            >
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Start Learning Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Browse Courses
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex items-center gap-8 text-sm text-gray-600"
                        >
                            <div className="flex items-center">
                                <Users className="w-5 h-5 mr-2 text-blue-500" />
                                <span>50,000+ Students</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" />
                                <span>4.9/5 Rating</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Video Preview */}
                    <div className="lg:w-1/2 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative"
                        >
                            {/* Main video container */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                                    {/* Video placeholder with play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                        >
                                            <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
                                        </motion.button>
                                    </div>

                                    {/* Floating elements */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-800"
                                    >
                                        HD Quality
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-800"
                                    >
                                        Interactive Learning
                                    </motion.div>
                                </div>
                            </div>

                            {/* Floating course cards */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">React Masterclass</p>
                                        <p className="text-xs text-gray-500">2.5k enrolled</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Design Systems</p>
                                        <p className="text-xs text-gray-500">1.8k enrolled</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}