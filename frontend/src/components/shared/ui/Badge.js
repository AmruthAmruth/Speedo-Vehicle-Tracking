import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../utils/cn';
export const Badge = ({ className, variant = 'primary', size = 'md', pulse = false, icon, children, ...props }) => {
    const variants = {
        primary: 'bg-brand-50 text-brand-700 border-brand-100',
        secondary: 'bg-slate-100 text-slate-700 border-slate-200',
        outline: 'bg-transparent text-slate-600 border-slate-200',
        ghost: 'bg-transparent text-slate-500 border-transparent',
        success: 'bg-success-light text-success-dark border-success/20',
        warning: 'bg-warning-light text-warning-dark border-warning/20',
        error: 'bg-error-light text-error-dark border-error/20',
        info: 'bg-info-light text-info-dark border-info/20',
    };
    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
    };
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full border font-bold uppercase tracking-wider transition-colors", variants[variant], sizes[size], pulse && "animate-pulse-subtle", className), ...props, children: [pulse && !icon && (_jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", variant === 'primary' ? "bg-brand-500" :
                    variant === 'success' ? "bg-success" :
                        variant === 'error' ? "bg-error" : "bg-current") })), icon && _jsx("span", { className: "shrink-0", children: icon }), children] }));
};
export default Badge;
