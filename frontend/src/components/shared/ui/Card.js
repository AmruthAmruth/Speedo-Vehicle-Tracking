import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../../utils/cn';
export const Card = ({ className, hover = true, ...props }) => (_jsx("div", { className: cn("rounded-2xl border border-slate-100 bg-white p-6 shadow-premium transition-all duration-300", hover && "hover:shadow-premium-hover hover:-translate-y-0.5", className), ...props }));
export const CardHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col space-y-1.5 pb-4", className), ...props }));
export const CardTitle = ({ className, ...props }) => (_jsx("h3", { className: cn("font-display text-lg font-semibold leading-none tracking-tight text-slate-900", className), ...props }));
export const CardDescription = ({ className, ...props }) => (_jsx("p", { className: cn("text-sm text-slate-500", className), ...props }));
export const CardContent = ({ className, ...props }) => (_jsx("div", { className: cn("pt-0", className), ...props }));
export const CardFooter = ({ className, ...props }) => (_jsx("div", { className: cn("flex items-center pt-4", className), ...props }));
