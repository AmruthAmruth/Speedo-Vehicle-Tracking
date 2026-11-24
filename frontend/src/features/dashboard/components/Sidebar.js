import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/routes';
import SpeedIcon from '@mui/icons-material/Speed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../utils/cn';
// Menu items have no reactive deps — defined outside to avoid recreation on every render
const MENU_ITEMS = [
    { path: APP_ROUTES.DASHBOARD.ROOT, icon: _jsx(DashboardIcon, { sx: { fontSize: 20 } }), label: 'Overview', exact: true },
    { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.LIVE_TRACKING}`, icon: _jsx(GpsFixedIcon, { sx: { fontSize: 20 } }), label: 'Live Tracking', exact: false },
    { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.TRIPS}`, icon: _jsx(HistoryIcon, { sx: { fontSize: 20 } }), label: 'History', exact: false },
    { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.DRIVERS}`, icon: _jsx(BarChartIcon, { sx: { fontSize: 20 } }), label: 'Analysis', exact: false },
    { path: `${APP_ROUTES.DASHBOARD.ROOT}/${APP_ROUTES.DASHBOARD.UPLOAD}`, icon: _jsx(UploadFileIcon, { sx: { fontSize: 20 } }), label: 'Upload', exact: false },
];
const Sidebar = memo(({ isOpen, onToggle }) => {
    const { logout } = useAuth();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: cn("fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden", isOpen ? "opacity-100" : "opacity-0 pointer-events-none"), onClick: onToggle }), _jsxs("aside", { className: cn("fixed top-0 left-0 z-50 h-screen transition-all duration-300 border-r border-slate-100 bg-white flex flex-col overflow-hidden", "lg:translate-x-0", isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"), children: [_jsxs("div", { className: "flex items-center gap-4 px-6 py-10 mb-6 shrink-0", children: [_jsx("div", { className: "bg-black p-2.5 rounded-xl shadow-lg shadow-black/10", children: _jsx(SpeedIcon, { className: "text-white", sx: { fontSize: 22 } }) }), isOpen && (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-lg font-black uppercase tracking-tighter leading-none", children: "Speedo" }), _jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1", children: "Fleet Ops" })] }))] }), _jsx("nav", { className: "flex-grow px-3 space-y-2", children: MENU_ITEMS.map((item) => (_jsx(NavLink, { to: item.path, end: item.exact, className: ({ isActive }) => cn("flex items-center gap-4 px-4 py-3.5 transition-all duration-200 rounded-2xl group", isActive
                                ? "bg-black text-white shadow-xl shadow-black/10"
                                : "text-slate-400 hover:text-black hover:bg-slate-50"), children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx("span", { className: cn("transition-colors", isActive ? "text-white" : "group-hover:text-black"), children: item.icon }), isOpen && (_jsx("span", { className: "text-[11px] font-bold uppercase tracking-[0.15em]", children: item.label }))] })) }, item.path))) }), _jsxs("div", { className: "px-3 pb-8 space-y-4", children: [_jsxs("button", { onClick: logout, className: cn("flex items-center gap-4 px-4 py-4 w-full transition-all duration-200 rounded-2xl group text-slate-400 hover:text-rose-600 hover:bg-rose-50", !isOpen && "justify-center"), children: [_jsx(ExitToAppIcon, { sx: { fontSize: 20 } }), isOpen && _jsx("span", { className: "text-[11px] font-bold uppercase tracking-[0.15em]", children: "Sign Out" })] }), isOpen && (_jsxs("div", { className: "mx-2 p-4 bg-slate-50 rounded-2xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-slate-300", children: "System v2.0" }), _jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" })] }), _jsx("p", { className: "text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tighter", children: "Active Monitoring Engaged" })] }))] })] })] }));
});
Sidebar.displayName = 'Sidebar';
export default Sidebar;
