import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from './Card';
import { cn } from '../../../utils/cn';
export const StatCard = ({ label, value, icon, trend, className, iconClassName, iconColor, subValue }) => {
    return (_jsxs(Card, { className: cn("p-6 border-slate-50 shadow-premium relative overflow-hidden group", className), children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-[0.2em]", children: label }), _jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-3xl font-black text-slate-900 tracking-tight", children: value }), subValue && (_jsx("p", { className: "text-xs font-semibold text-slate-400", children: subValue }))] }), trend && (_jsxs("div", { className: cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-wider", trend.isUp ? "text-success-dark" : "text-error"), children: [_jsxs("span", { children: [trend.isUp ? '↑' : '↓', " ", trend.value, "%"] }), _jsx("span", { className: "text-slate-300 font-medium", children: "vs last month" })] }))] }), _jsx("div", { className: cn("p-4 rounded-2xl transition-all duration-300", iconColor
                            ? "text-white"
                            : "bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-500", iconClassName), style: iconColor ? { background: iconColor } : undefined, children: icon })] }), _jsx("div", { className: "absolute -bottom-6 -right-6 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors" })] }));
};
export default StatCard;
