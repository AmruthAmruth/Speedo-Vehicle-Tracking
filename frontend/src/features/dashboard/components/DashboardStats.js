import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDistance, formatDuration } from '../../../utils/tripUtils';
import { StatCard } from '../../../components/shared/ui/StatCard';
const DashboardStats = ({ stats }) => {
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(StatCard, { label: "Total Fleet Trips", value: stats.totalTrips, icon: _jsx(DashboardIcon, { sx: { fontSize: 24 } }), trend: { value: 12, isUp: true } }), _jsx(StatCard, { label: "Active Units", value: stats.activeTripsCount, icon: _jsx(GpsFixedIcon, { sx: { fontSize: 24 } }), iconClassName: stats.activeTripsCount > 0 ? "text-success bg-success/10" : "" }), _jsx(StatCard, { label: "Cumulative Distance", value: formatDistance(stats.totalDistance), icon: _jsx(RouteIcon, { sx: { fontSize: 24 } }), trend: { value: 8, isUp: true } }), _jsx(StatCard, { label: "Fleet Utilization", value: formatDuration(stats.totalDuration), icon: _jsx(AccessTimeIcon, { sx: { fontSize: 24 } }), trend: { value: 4, isUp: false } })] }));
};
export default DashboardStats;
