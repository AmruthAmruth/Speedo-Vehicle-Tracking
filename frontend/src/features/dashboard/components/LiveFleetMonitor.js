import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Button, Card } from '../../../components/shared/ui';
const LiveFleetMonitor = ({ activeTripsCount }) => {
    const navigate = useNavigate();
    if (activeTripsCount === 0)
        return null;
    return (_jsxs(Card, { className: "relative overflow-hidden border-none bg-gradient-to-br from-error-dark to-error p-8 text-white shadow-xl shadow-error/20 animate-pulse-subtle", children: [_jsx("div", { className: "absolute top-0 right-0 p-8 opacity-10", children: _jsx(GpsFixedIcon, { sx: { fontSize: 120 } }) }), _jsxs("div", { className: "relative flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "p-4 bg-white/20 rounded-2xl backdrop-blur-md", children: _jsx(GpsFixedIcon, { sx: { fontSize: 32 } }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-ping" }), _jsx("h3", { className: "text-xl font-black tracking-tight uppercase", children: "Live Fleet Monitor" })] }), _jsxs("p", { className: "text-white/80 font-medium max-w-md", children: [_jsxs("span", { className: "font-bold text-white", children: [activeTripsCount, " vehicle", activeTripsCount > 1 ? 's are' : ' is'] }), " currently transmitting real-time GPS telemetry to the dashboard."] })] })] }), _jsx(Button, { variant: "secondary", size: "lg", onClick: () => navigate('/dashboard/live'), className: "bg-white text-error hover:bg-white/90 border-none px-10 font-black shadow-lg", children: "Monitor Fleet" })] })] }));
};
export default LiveFleetMonitor;
