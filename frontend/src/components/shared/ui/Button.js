import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../../utils/cn';
export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const variants = {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm active:scale-[0.98]',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98]',
        outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 active:scale-[0.98]',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 active:scale-[0.98]',
        danger: 'bg-error text-white hover:bg-error-dark shadow-sm active:scale-[0.98]',
        success: 'bg-success text-white hover:bg-success-dark shadow-sm active:scale-[0.98]',
    };
    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10 p-2',
    };
    return (_jsxs("button", { ref: ref, disabled: disabled || isLoading, className: cn('inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className), ...props, children: [isLoading && (_jsxs("svg", { className: "mr-2 h-4 w-4 animate-spin", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })), !isLoading && leftIcon && _jsx("span", { className: "mr-2", children: leftIcon }), children, !isLoading && rightIcon && _jsx("span", { className: "ml-2", children: rightIcon })] }));
});
Button.displayName = 'Button';
