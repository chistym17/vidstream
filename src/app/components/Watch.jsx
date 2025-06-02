"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, Clock, CheckCircle, Lock, Users, Star, ThumbsUp, Share2, Bookmark, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Login from './Login';

const motion = {
    div: ({ children, initial, animate, transition, whileHover, className, ...props }) => (
        <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, initial, animate, transition, whileHover, whileTap, className, ...props }) => (
        <button className={className} {...props}>{children}</button>
    )
};

const mockVideos = [
    {
        id: 1,
        title: "Sunshine Nature",
        duration: "12:45",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
        videoUrl: "http://localhost:8000/stream",
        isCompleted: true,
        isLocked: false,
        description: "Learn the fundamentals of React Hooks and how they revolutionize functional components.",
        isHls: true,
        requiresAuth: true
    },
    {
        id: 2,
        title: "useState Hook Deep Dive",
        duration: "18:32",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isCompleted: true,
        isLocked: false,
        description: "Master the useState hook with practical examples and best practices."
    },
    {
        id: 3,
        title: "useEffect and Side Effects",
        duration: "22:15",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isCompleted: false,
        isLocked: false,
        description: "Understanding useEffect hook for handling side effects in React applications."
    },
    {
        id: 4,
        title: "Custom Hooks Creation",
        duration: "25:48",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isCompleted: false,
        isLocked: false,
        description: "Learn how to create reusable custom hooks for cleaner component logic."
    },
    {
        id: 5,
        title: "Advanced Hook Patterns",
        duration: "31:22",
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        isCompleted: false,
        isLocked: false,
        description: "Explore advanced patterns and optimization techniques with React Hooks."
    },
    {
        id: 6,
        title: "Testing Hooks",
        duration: "19:30",
        thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        isCompleted: false,
        isLocked: true,
        description: "Learn comprehensive testing strategies for React Hooks."
    },
    {
        id: 7,
        title: "Hooks Performance Optimization",
        duration: "27:45",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        isCompleted: false,
        isLocked: true,
        description: "Optimize your React applications using advanced hook techniques."
    }
];

const courseInfo = {
    title: "Complete React Hooks Masterclass",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12847,
    totalDuration: "2h 37m"
};

export default function EduStreamWatchPage() {
    const [currentVideo, setCurrentVideo] = useState(mockVideos[0]);
    const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (!playerRef.current && videoRef.current && isAuthenticated && currentVideo.isHls) {
            const videoElement = videoRef.current;
            let toastShown = false;
            
            const preventContextMenu = (e) => {
                if (e.target === videoElement || e.target === playerRef.current?.el()) {
                    e.preventDefault();
                    if (!toastShown) {
                        toast('⚠️ Right-click is disabled for content protection', {
                            id: 'right-click-warning',
                            duration: 2000
                        });
                        toastShown = true;
                        setTimeout(() => {
                            toastShown = false;
                        }, 2000);
                    }
                    return false;
                }
            };

            videoElement.addEventListener('contextmenu', preventContextMenu);

            const player = videojs(videoElement, {
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                    src: currentVideo.requiresAuth 
                        ? `${currentVideo.videoUrl}?token=${authToken}`
                        : currentVideo.videoUrl,
                    type: 'application/x-mpegURL'
                }],
                html5: {
                    hls: {
                        enableLowInitialPlaylist: true,
                        smoothQualityChange: true,
                        overrideNative: true,
                        xhrSetup: function(xhr) {
                            if (currentVideo.requiresAuth) {
                                xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
                            }
                        }
                    }
                }
            });

            const playerElement = player.el();
            playerElement.addEventListener('contextmenu', preventContextMenu);

            player.on('error', (error) => {
                console.error('Video.js error:', error);
                if (error.code() === 4) {
                    toast.error('Error loading video. Please try logging in again.');
                    handleLogout();
                }
            });

            playerRef.current = player;

            return () => {
                if (playerRef.current) {
                    videoElement.removeEventListener('contextmenu', preventContextMenu);
                    playerElement.removeEventListener('contextmenu', preventContextMenu);
                    
                    playerRef.current.dispose();
                    playerRef.current = null;
                }
            };
        }
    }, [currentVideo, isAuthenticated, authToken]);

    const handleLoginSuccess = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setAuthToken(null);
        router.push('/');
        toast.success('Logged out successfully');
    };

    if (!isAuthenticated) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    const handleVideoSelect = (video) => {
        if (!video.isLocked) {
            setCurrentVideo(video);
        }
    };

    const formatDuration = (duration) => {
        return duration;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Add noscript warning */}
            <noscript>
                <div className="fixed inset-0 bg-red-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            JavaScript Required
                        </h2>
                        <p className="text-gray-700 mb-4">
                            This video player requires JavaScript to be enabled for secure playback.
                            Please enable JavaScript in your browser settings to continue.
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>Why is JavaScript required?</p>
                            <ul className="list-disc list-inside mt-2 text-left">
                                <li>Secure video streaming</li>
                                <li>Content protection</li>
                                <li>Quality selection</li>
                                <li>Playback controls</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </noscript>

            {/* Add Logout Button */}
            <div className="absolute top-4 right-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </motion.button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Video Player Section */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            {/* Video Player - only prevent right-click on the video element itself */}
                            <div className="relative aspect-video bg-black">
                                {currentVideo.isHls ? (
                                    <div data-vjs-player>
                                        <video
                                            ref={videoRef}
                                            className="video-js vjs-big-play-centered vjs-theme-city"
                                            playsInline
                                        >
                                            <p className="vjs-no-js">
                                                To view this video please enable JavaScript, and consider upgrading to a
                                                web browser that supports HTML5 video
                                            </p>
                                        </video>
                                    </div>
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full"
                                        controls
                                        poster={currentVideo.thumbnail}
                                        src={currentVideo.videoUrl}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="p-6">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                    {currentVideo.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {currentVideo.duration}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {courseInfo.students.toLocaleString()} students
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" />
                                        {courseInfo.rating}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {currentVideo.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        <ThumbsUp className="w-4 h-4 mr-2" />
                                        Like
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        <Bookmark className="w-4 h-4 mr-2" />
                                        Save
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar with Playlist */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24"
                        >
                            {/* Course Header */}
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    {courseInfo.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-3">
                                    by {courseInfo.instructor}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>{mockVideos.length} lessons</span>
                                    <span>{courseInfo.totalDuration}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Progress</span>
                                        <span>{Math.round((mockVideos.filter(v => v.isCompleted).length / mockVideos.length) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${(mockVideos.filter(v => v.isCompleted).length / mockVideos.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Playlist Toggle */}
                            <button
                                onClick={() => setIsPlaylistExpanded(!isPlaylistExpanded)}
                                className="w-full px-6 py-3 flex items-center justify-between text-left border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900">Course Content</span>
                                {isPlaylistExpanded ?
                                    <ChevronUp className="w-5 h-5 text-gray-500" /> :
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                }
                            </button>

                            {/* Video Playlist */}
                            {isPlaylistExpanded && (
                                <div className="max-h-96 overflow-y-auto">
                                    {mockVideos.map((video, index) => (
                                        <motion.div
                                            key={video.id}
                                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                                            onClick={() => handleVideoSelect(video)}
                                            className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${currentVideo.id === video.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                                } ${video.isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                {/* Thumbnail */}
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-16 h-12 object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        {video.isLocked ? (
                                                            <Lock className="w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-1" />
                                                        ) : video.isCompleted ? (
                                                            <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" fill="currentColor" />
                                                        ) : (
                                                            <Play className="w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-1" fill="currentColor" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Video Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`text-sm font-medium mb-1 line-clamp-2 ${currentVideo.id === video.id ? 'text-blue-600' : 'text-gray-900'
                                                        }`}>
                                                        {index + 1}. {video.title}
                                                    </h3>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {video.duration}
                                                        {video.isCompleted && (
                                                            <CheckCircle className="w-3 h-3 ml-2 text-green-500" fill="currentColor" />
                                                        )}
                                                        {video.isLocked && (
                                                            <Lock className="w-3 h-3 ml-2 text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}