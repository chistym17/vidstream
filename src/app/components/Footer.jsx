'use client'
import React, { useState } from 'react';
import { 
  Star, Quote, ChevronLeft, ChevronRight, Play, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight,
  BookOpen, Video, Award, Users, Shield, Zap, Globe, Heart
} from 'lucide-react';

// Mock Framer Motion for this environment
const motion = {
  div: ({ children, initial, animate, transition, whileHover, className, ...props }) => (
    <div className={className} {...props}>{children}</div>
  ),
  button: ({ children, initial, animate, transition, whileHover, whileTap, className, ...props }) => (
    <button className={className} {...props}>{children}</button>
  ),
  h2: ({ children, initial, animate, transition, className, ...props }) => (
    <h2 className={className} {...props}>{children}</h2>
  ),
  p: ({ children, initial, animate, transition, className, ...props }) => (
    <p className={className} {...props}>{children}</p>
  ),
  a: ({ children, whileHover, href, className, ...props }) => (
    <a href={href} className={className} {...props}>{children}</a>
  )
};

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "EduStream transformed my career! The interactive video courses and expert instructors helped me land my dream job at Google. The quality is unmatched.",
    rating: 5,
    course: "Advanced React Development"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The structured learning path and real-world projects on EduStream gave me the confidence to transition into product management. Absolutely worth every penny!",
    rating: 5,
    course: "Product Management Fundamentals"
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "UX Designer",
    company: "Spotify",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "I love how EduStream combines theory with hands-on practice. The design courses helped me build an amazing portfolio that got me hired at Spotify!",
    rating: 5,
    course: "UI/UX Design Mastery"
  },
  {
    id: 4,
    name: "David Park",
    role: "Data Scientist",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The machine learning courses on EduStream are incredibly comprehensive. The instructors explain complex concepts in such an accessible way. Highly recommended!",
    rating: 5,
    course: "Machine Learning Bootcamp"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "Adobe",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    content: "EduStream's marketing courses are cutting-edge and practical. I implemented strategies from the courses and saw immediate results in our campaigns.",
    rating: 5,
    course: "Digital Marketing Strategy"
  }
];

const footerLinks = {
  courses: [
    { name: 'Web Development', href: '#' },
    { name: 'Data Science', href: '#' },
    { name: 'Design', href: '#' },
    { name: 'Business', href: '#' },
    { name: 'Marketing', href: '#' },
    { name: 'Photography', href: '#' }
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Partners', href: '#' }
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Student Support', href: '#' },
    { name: 'Instructor Support', href: '#' },
    { name: 'System Status', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Community', href: '#' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'DMCA', href: '#' },
    { name: 'Refund Policy', href: '#' },
    { name: 'Sitemap', href: '#' }
  ]
};

const stats = [
  { icon: Users, value: '50,000+', label: 'Active Students' },
  { icon: Video, value: '1,200+', label: 'Video Courses' },
  { icon: Award, value: '98%', label: 'Success Rate' },
  { icon: Globe, value: '180+', label: 'Countries' }
];

export default function EduStreamHomepageSections() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div>
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Loved by
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Students </span>
              Worldwide
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join thousands of successful learners who transformed their careers with EduStream's expert-led courses
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-100" fill="currentColor" />
              
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Stars */}
                  <div className="flex justify-center lg:justify-start mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>

                  {/* Course Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full border border-blue-200/50">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {testimonials[currentTestimonial].course}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10">
          {/* Newsletter Section */}
          <div className="border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Get the latest courses, updates, and exclusive offers delivered straight to your inbox
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 mb-6"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    EduStream
                  </span>
                </motion.div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Transform your future with world-class online courses. Learn from industry experts and join a community of ambitious learners.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-blue-400" />
                    support@edustream.com
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-blue-400" />
                    +1 (555) 123-4567
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                    San Francisco, CA
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Courses</h4>
                <ul className="space-y-3">
                  {footerLinks.courses.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        whileHover={{ x: 4, color: '#60a5fa' }}
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        whileHover={{ x: 4, color: '#60a5fa' }}
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        whileHover={{ x: 4, color: '#60a5fa' }}
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        whileHover={{ x: 4, color: '#60a5fa' }}
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Copyright */}
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 EduStream. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-500" fill="currentColor" /> for learners worldwide.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { Icon: Facebook, href: '#', label: 'Facebook' },
                    { Icon: Twitter, href: '#', label: 'Twitter' },
                    { Icon: Instagram, href: '#', label: 'Instagram' },
                    { Icon: Youtube, href: '#', label: 'YouTube' },
                    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <motion.a
                      key={label}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}