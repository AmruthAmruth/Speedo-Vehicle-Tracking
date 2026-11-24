import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../constants/constants';
import { APP_ROUTES } from '../../../constants/routes';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import '../styles/auth.css';
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const validateForm = () => {
        const newErrors = {
            email: '',
            password: '',
            general: '',
        };
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        setErrors(prev => ({ ...prev, general: '' }));
        try {
            await login(formData.email, formData.password);
            toast.success('Login successful! Welcome back.');
            // Redirect to dashboard or home after successful login
            navigate(APP_ROUTES.DASHBOARD.ROOT);
        }
        catch (error) {
            let errorMessage = 'Login failed. Please try again.';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            setErrors(prev => ({
                ...prev,
                general: errorMessage,
            }));
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "auth-container", children: [_jsx("div", { className: "auth-bg-pattern" }), _jsx("div", { className: "back-to-home", children: _jsxs(Link, { to: APP_ROUTES.HOME, children: [_jsx(ArrowBackIcon, {}), _jsx("span", { children: "Back to Home" })] }) }), _jsxs("div", { className: "auth-split-container", children: [_jsxs("div", { className: "auth-branding", children: [_jsxs("div", { className: "auth-logo", children: [_jsx("div", { className: "auth-logo-icon", children: _jsx(SpeedIcon, { style: { fontSize: '3rem', color: COLORS.textInverse } }) }), _jsx("span", { className: "auth-logo-text", children: "Speedo" })] }), _jsx("h1", { children: "Welcome Back!" }), _jsx("p", { children: "Sign in to access your vehicle tracking dashboard and monitor your fleet in real-time." })] }), _jsx("div", { className: "auth-form-container", children: _jsxs("div", { className: "auth-form-card", children: [_jsxs("div", { className: "auth-form-header", children: [_jsx("h2", { children: "Sign In" }), _jsx("p", { children: "Enter your credentials to access your account" })] }), errors.general && (_jsx("div", { className: "p-4 bg-red-50 border border-accent-rose rounded-lg mb-6 text-accent-rose text-sm", children: errors.general })), _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email Address" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: `form-input ${errors.email ? 'error' : ''}`, placeholder: "you@example.com", disabled: isLoading }), errors.email && _jsx("span", { className: "error-message", children: errors.email })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `form-input ${errors.password ? 'error' : ''}`, placeholder: "Enter your password", disabled: isLoading }), errors.password && _jsx("span", { className: "error-message", children: errors.password })] }), _jsxs("div", { className: "form-options", children: [_jsxs("label", { className: "remember-me", children: [_jsx("input", { type: "checkbox", name: "rememberMe", checked: formData.rememberMe, onChange: handleChange, disabled: isLoading }), _jsx("span", { children: "Remember me" })] }), _jsx("a", { href: "#", className: "forgot-password", children: "Forgot password?" })] }), _jsx("button", { type: "submit", className: "auth-submit-btn", disabled: isLoading, children: isLoading ? (_jsxs("span", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }, children: [_jsx("span", { className: "spinner" }), "Signing in..."] })) : ('Sign In') })] }), _jsxs("div", { className: "auth-switch", children: ["Don't have an account?", _jsx(Link, { to: APP_ROUTES.REGISTER, children: "Sign up" })] })] }) })] })] }));
};
export default Login;
