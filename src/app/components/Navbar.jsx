"use client"
import React, { useState } from 'react';
import { Play, Search, Bell, User, Menu, X, ChevronDown, BookOpen, Video, Award, Users } from 'lucide-react';

// Mock Framer Motion for this environment
const motion = {
    nav: ({ children, initial, animate, transition, className, ...props }) => (
        <nav className={className} {...props}>{children}</nav>
    ),
    div: ({ children, initial, animate, transition, whileHover, className, ...props }) => (
        <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, initial, animate, transition, whileHover, whileTap, className, ...props }) => (
        <button className={className} {...props}>{children}</button>
    ),
    a: ({ children, whileHover, className, ...props }) => (
        <a className={className} {...props}>{children}</a>
    )
};

export default function EduStreamNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navLinks = [
        {
            name: 'Courses',
            href: '#',
            dropdown: [
                { name: 'All Courses', href: '#', icon: BookOpen },
                { name: 'Live Sessions', href: '#', icon: Video },
                { name: 'Certificates', href: '#', icon: Award },
                { name: 'Study Groups', href: '#', icon: Users },
            ]
        },
        { name: 'Pricing', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            EduStream
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <motion.a
                                    whileHover={{ y: -2 }}
                                    href={link.href}
                                    className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2"
                                >
                                    {link.name}
                                    {link.dropdown && (
                                        <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200" />
                                    )}
                                </motion.a>

                                {/* Dropdown Menu */}
                                {link.dropdown && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                                    >
                                        {link.dropdown.map((item) => (
                                            <motion.a
                                                key={item.name}
                                                whileHover={{ x: 4, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                                                href={item.href}
                                                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                <item.icon className="w-5 h-5 mr-3 text-gray-400" />
                                                <span className="font-medium">{item.name}</span>
                                            </motion.a>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Search, Notifications, User */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                        >
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 w-64"
                            />
                        </motion.div>

                        {/* Notifications */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        </motion.button>

                        {/* User Profile */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                        >
                            <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Start Free Trial
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-gray-100 py-4"
                    >
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Search */}
                            <div className="px-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Mobile Navigation Links */}
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <motion.a
                                        whileHover={{ x: 4 }}
                                        href={link.href}
                                        className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                    >
                                        {link.name}
                                    </motion.a>
                                    {link.dropdown && (
                                        <div className="pl-8 space-y-2 mt-2">
                                            {link.dropdown.map((item) => (
                                                <motion.a
                                                    key={item.name}
                                                    whileHover={{ x: 4 }}
                                                    href={item.href}
                                                    className="flex items-center py-2 text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                                                >
                                                    <item.icon className="w-4 h-4 mr-2" />
                                                    {item.name}
                                                </motion.a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Mobile CTA */}
                            <div className="px-4 pt-4 border-t border-gray-100">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md"
                                >
                                    Start Free Trial
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}