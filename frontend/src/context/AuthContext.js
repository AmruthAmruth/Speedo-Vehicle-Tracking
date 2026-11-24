import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { authApi } from '../services/authApi';
import { toast } from 'react-toastify';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Load user and tokens from localStorage on mount
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        if (storedAccessToken && storedUser) {
            try {
                setAccessToken(storedAccessToken);
                setUser(JSON.parse(storedUser));
            }
            catch {
                // Corrupted storage — clear and start fresh
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);
    const login = useCallback(async (email, password) => {
        try {
            const response = await authApi.login({ email, password });
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            setAccessToken(response.accessToken);
            setUser(response.user);
        }
        catch (error) {
            let errorMessage = 'Login failed';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }, []);
    const register = useCallback(async (name, email, password) => {
        try {
            await authApi.register({ name, email, password });
            // After registration, automatically log in
            await login(email, password);
        }
        catch (error) {
            let errorMessage = 'Registration failed';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw new Error(errorMessage);
        }
    }, [login]);
    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setAccessToken(null);
        setUser(null);
        toast.info('Logged out successfully');
    }, []);
    // Memoize context value to prevent consumers from re-rendering on every parent render
    const value = useMemo(() => ({
        user,
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        isLoading,
        login,
        register,
        logout,
    }), [user, accessToken, isLoading, login, register, logout]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
