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
const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            general: '',
        };
        // Name validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
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
        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
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
            await register(formData.name, formData.email, formData.password);
            toast.success('Registration successful! Welcome to Speedo.');
            // Redirect to dashboard after successful registration
            navigate(APP_ROUTES.DASHBOARD.ROOT);
        }
        catch (error) {
            let errorMessage = 'Registration failed. Please try again.';
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
    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password)
            return { strength: '', colorClass: '' };
        if (password.length < 6) {
            return { strength: 'Weak', colorClass: 'text-accent-rose' };
        }
        else if (password.length < 10) {
            return { strength: 'Medium', colorClass: 'text-accent-amber' };
        }
        else {
            return { strength: 'Strong', colorClass: 'text-accent-teal' };
        }
    };
    const passwordStrength = getPasswordStrength();
    return (_jsxs("div", { className: "auth-container", children: [_jsx("div", { className: "auth-bg-pattern" }), _jsx("div", { className: "back-to-home", children: _jsxs(Link, { to: APP_ROUTES.HOME, children: [_jsx(ArrowBackIcon, {}), _jsx("span", { children: "Back to Home" })] }) }), _jsxs("div", { className: "auth-split-container", children: [_jsxs("div", { className: "auth-branding", children: [_jsxs("div", { className: "auth-logo", children: [_jsx("div", { className: "auth-logo-icon", children: _jsx(SpeedIcon, { style: { fontSize: '3rem', color: COLORS.textInverse } }) }), _jsx("span", { className: "auth-logo-text", children: "Speedo" })] }), _jsx("h1", { children: "Join Speedo Today!" }), _jsx("p", { children: "Create your account and start tracking your vehicle fleet with precision and ease." })] }), _jsx("div", { className: "auth-form-container", children: _jsxs("div", { className: "auth-form-card", children: [_jsxs("div", { className: "auth-form-header", children: [_jsx("h2", { children: "Create Account" }), _jsx("p", { children: "Fill in your details to get started" })] }), errors.general && (_jsx("div", { className: "p-4 bg-red-50 border border-accent-rose rounded-lg mb-6 text-accent-rose text-sm", children: errors.general })), _jsxs("form", { className: "auth-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Full Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, className: `form-input ${errors.name ? 'error' : ''}`, placeholder: "John Doe", disabled: isLoading }), errors.name && _jsx("span", { className: "error-message", children: errors.name })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: "Email Address" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: `form-input ${errors.email ? 'error' : ''}`, placeholder: "you@example.com", disabled: isLoading }), errors.email && _jsx("span", { className: "error-message", children: errors.email })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `form-input ${errors.password ? 'error' : ''}`, placeholder: "Create a strong password", disabled: isLoading }), passwordStrength.strength && (_jsxs("div", { className: `text-sm mt-1 ${passwordStrength.colorClass}`, children: ["Password strength: ", _jsx("strong", { children: passwordStrength.strength })] })), errors.password && _jsx("span", { className: "error-message", children: errors.password })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx("input", { type: "password", id: "confirmPassword", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, className: `form-input ${errors.confirmPassword ? 'error' : ''}`, placeholder: "Re-enter your password", disabled: isLoading }), errors.confirmPassword && _jsx("span", { className: "error-message", children: errors.confirmPassword })] }), _jsx("button", { type: "submit", className: "auth-submit-btn", disabled: isLoading, children: isLoading ? (_jsxs("span", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }, children: [_jsx("span", { className: "spinner" }), "Creating account..."] })) : ('Create Account') })] }), _jsxs("div", { className: "auth-switch", children: ["Already have an account?", _jsx(Link, { to: APP_ROUTES.LOGIN, children: "Sign in" })] })] }) })] })] }));
};
export default Register;
