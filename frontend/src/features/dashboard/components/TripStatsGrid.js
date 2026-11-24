import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDistance, formatDuration, formatSpeed } from '../../../utils/tripUtils';
import StatCard from '../../../components/shared/ui/StatCard';
const TripStatsGrid = ({ stats, gpsPointsCount }) => {
    return (_jsxs("div", { className: "stats-grid", style: { marginBottom: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }, children: [_jsx(StatCard, { label: "Total Distance", value: formatDistance(stats.distance), icon: _jsx(RouteIcon, { style: { fontSize: 28 } }) }), _jsx(StatCard, { label: "Duration", value: formatDuration(stats.duration), icon: _jsx(AccessTimeIcon, { style: { fontSize: 28 } }), iconColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }), _jsx(StatCard, { label: "Avg Speed", value: formatSpeed(stats.avgSpeed), icon: _jsx(SpeedIcon, { style: { fontSize: 28 } }), iconColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", subValue: `Max: ${formatSpeed(stats.maxSpeed)}` }), _jsx(StatCard, { label: "Idling Time", value: formatDuration(stats.idling), icon: _jsx(PauseCircleIcon, { style: { fontSize: 28 } }), iconColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }), _jsx(StatCard, { label: "Stoppage Time", value: formatDuration(stats.stoppage), icon: _jsx(StopCircleIcon, { style: { fontSize: 28 } }), iconColor: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" }), _jsx(StatCard, { label: "GPS Points", value: gpsPointsCount, icon: _jsx(LocationOnIcon, { style: { fontSize: 28 } }), iconColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" })] }));
};
export default TripStatsGrid;
