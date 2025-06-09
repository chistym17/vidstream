"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuthStatus = () => {
        const authToken = localStorage.getItem('authToken');
        const userInfo = localStorage.getItem('user');
        
        if (authToken && userInfo) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userInfo));
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuthStatus();

        window.addEventListener('storage', checkAuthStatus);
        
        window.addEventListener('authChange', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            window.removeEventListener('authChange', checkAuthStatus);
        };
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
        window.dispatchEvent(new Event('authChange'));
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 