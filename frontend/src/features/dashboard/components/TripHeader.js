import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatDate } from '../../../utils/tripUtils';
import Badge from '../../../components/shared/ui/Badge';
const TripHeader = ({ trip, isSimulating, onStartSimulation, onStopSimulation, onEndLiveTrip, onDeleteTrip }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }, children: [_jsxs("button", { className: "btn-secondary", onClick: () => navigate('/dashboard/trips'), children: [_jsx(ArrowBackIcon, { style: { fontSize: 18 } }), "Back to Trips"] }), _jsxs("div", { style: { display: 'flex', gap: '10px' }, children: [!isSimulating ? (_jsx("button", { className: "btn-primary", onClick: onStartSimulation, style: {
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    border: 'none',
                                    cursor: 'pointer'
                                }, children: "\uD83D\uDE80 Simulate Live Trip" })) : (_jsx("button", { className: "btn-primary", onClick: onStopSimulation, style: {
                                    background: '#EF4444',
                                    border: 'none',
                                    cursor: 'pointer'
                                }, children: "\uD83D\uDED1 Stop Simulation" })), trip.isActive && (_jsx("button", { className: "btn-primary", onClick: onEndLiveTrip, style: {
                                    background: '#EF4444',
                                    border: 'none',
                                    cursor: 'pointer'
                                }, children: "\u23F9\uFE0F End Live Trip" })), _jsx("button", { className: "btn-primary", onClick: onDeleteTrip, style: {
                                    background: '#E53E3E',
                                    border: 'none',
                                    cursor: 'pointer'
                                }, children: "\uD83D\uDDD1\uFE0F Delete Trip" })] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 8px 0' }, children: [_jsx("h2", { style: { fontSize: '28px', fontWeight: 700, color: '#2d3748', margin: 0 }, children: trip.name }), trip.isActive && (_jsx(Badge, { color: "red", pulse: true, children: "LIVE" }))] }), _jsxs("p", { style: { fontSize: '14px', color: '#718096', margin: 0 }, children: [formatDate(trip.startTime), " ", trip.isActive ? '- Ongoing' : `- ${formatDate(trip.endTime)}`] })] }));
};
export default TripHeader;
