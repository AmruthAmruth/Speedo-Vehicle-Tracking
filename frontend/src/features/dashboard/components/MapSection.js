import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TripMap from './TripMap';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RouteIcon from '@mui/icons-material/Route';
import { formatSpeed } from '../../../utils/tripUtils';
const MapSection = ({ gpsPoints, tripName, speedLimit, setSpeedLimit, showStoppages, setShowStoppages, showIdling, setShowIdling, replayIndex, setReplayIndex, isReplaying, setIsReplaying, playbackSpeed, setPlaybackSpeed }) => {
    return (_jsxs("div", { className: "dashboard-card", style: { marginBottom: '24px' }, children: [_jsx("div", { className: "card-header", style: { marginBottom: '16px' }, children: _jsxs("div", { children: [_jsx("h3", { className: "card-title", children: "Trip Route" }), _jsx("p", { className: "card-subtitle", children: "Interactive map with overspeed, stoppages, and idling detection" })] }) }), _jsxs("div", { style: {
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("label", { htmlFor: "speedLimit", style: { fontSize: '14px', fontWeight: 600, color: '#4b5563' }, children: "Speed Limit:" }), _jsx("input", { type: "number", id: "speedLimit", value: speedLimit, onChange: (e) => setSpeedLimit(Number(e.target.value)), min: "20", max: "200", step: "10", style: {
                                    width: '80px',
                                    padding: '6px 10px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: 600
                                } }), _jsx("span", { style: { fontSize: '14px', color: '#6b7280' }, children: "km/h" })] }), _jsxs("div", { style: { display: 'flex', gap: '12px' }, children: [_jsxs("label", { style: { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }, children: [_jsx("input", { type: "checkbox", checked: showStoppages, onChange: (e) => setShowStoppages(e.target.checked), style: { cursor: 'pointer' } }), _jsx("span", { style: { fontSize: '14px', color: '#4b5563' }, children: "Show Stoppages" })] }), _jsxs("label", { style: { display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }, children: [_jsx("input", { type: "checkbox", checked: showIdling, onChange: (e) => setShowIdling(e.target.checked), style: { cursor: 'pointer' } }), _jsx("span", { style: { fontSize: '14px', color: '#4b5563' }, children: "Show Idling" })] })] })] }), _jsxs("div", { style: { position: 'relative' }, children: [_jsx(TripMap, { gpsPoints: gpsPoints, tripName: tripName, speedLimit: speedLimit, showStoppages: showStoppages, showIdling: showIdling, activePointIndex: replayIndex !== null ? replayIndex : undefined }), _jsx("div", { style: {
                            position: 'absolute',
                            bottom: '30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'calc(100% - 60px)',
                            maxWidth: '850px',
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(12px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                            padding: '20px 28px',
                            borderRadius: '24px',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.05)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '24px' }, children: [_jsx("button", { onClick: () => setIsReplaying(!isReplaying), style: {
                                        background: isReplaying ? '#EF4444' : '#4F46E5',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '16px',
                                        width: '48px',
                                        height: '48px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: isReplaying ? '0 4px 12px rgba(239, 68, 68, 0.3)' : '0 4px 12px rgba(79, 70, 229, 0.3)',
                                        transform: 'scale(1)',
                                    }, onMouseEnter: (e) => e.currentTarget.style.transform = 'scale(1.05)', onMouseLeave: (e) => e.currentTarget.style.transform = 'scale(1)', children: isReplaying ?
                                        _jsx(PauseCircleIcon, { style: { fontSize: 28 } }) :
                                        _jsx(RouteIcon, { style: { fontSize: 28, transform: 'rotate(90deg)' } }) }), _jsxs("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, children: [_jsxs("div", { style: { display: 'flex', gap: '12px', alignItems: 'center' }, children: [_jsxs("div", { style: {
                                                                display: 'flex',
                                                                flexDirection: 'column'
                                                            }, children: [_jsx("span", { style: { fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Timeline" }), _jsx("span", { style: { fontSize: '16px', fontWeight: 700, color: '#1E293B' }, children: replayIndex !== null && gpsPoints[replayIndex] ?
                                                                        new Date(gpsPoints[replayIndex].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) :
                                                                        '--:--:--' })] }), _jsx("div", { style: { width: '1px', height: '24px', background: '#E2E8F0', margin: '0 4px' } }), _jsxs("div", { style: {
                                                                display: 'flex',
                                                                flexDirection: 'column'
                                                            }, children: [_jsx("span", { style: { fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Current Speed" }), replayIndex !== null && gpsPoints[replayIndex] ? (_jsx("span", { style: { fontSize: '16px', fontWeight: 700, color: gpsPoints[replayIndex].speed > speedLimit ? '#EF4444' : '#10B981' }, children: formatSpeed(gpsPoints[replayIndex].speed) })) : _jsx("span", { style: { fontSize: '16px', fontWeight: 700, color: '#94A3B8' }, children: "0 km/h" })] })] }), _jsxs("span", { style: { fontSize: '12px', color: '#64748b', fontWeight: 600, background: '#F1F5F9', padding: '4px 10px', borderRadius: '8px' }, children: [replayIndex !== null ? replayIndex + 1 : 0, " / ", gpsPoints.length, " Points"] })] }), _jsx("div", { style: { position: 'relative', width: '100%', height: '20px', display: 'flex', alignItems: 'center' }, children: _jsx("input", { type: "range", min: 0, max: gpsPoints.length > 0 ? gpsPoints.length - 1 : 0, value: replayIndex || 0, onChange: (e) => {
                                                    setReplayIndex(parseInt(e.target.value));
                                                    if (isReplaying)
                                                        setIsReplaying(false);
                                                }, style: {
                                                    width: '100%',
                                                    cursor: 'pointer',
                                                    accentColor: '#4F46E5',
                                                    height: '6px',
                                                    borderRadius: '3px',
                                                    background: '#E2E8F0',
                                                    outline: 'none'
                                                } }) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', minWidth: '110px' }, children: [_jsx("span", { style: { fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Playback" }), _jsx("div", { style: { display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '12px', gap: '2px', border: '1px solid #E2E8F0' }, children: [1, 2, 5].map(speed => (_jsxs("button", { onClick: () => setPlaybackSpeed(speed), style: {
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    fontWeight: 800,
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    background: playbackSpeed === speed ? '#4F46E5' : 'transparent',
                                                    color: playbackSpeed === speed ? 'white' : '#64748B',
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    boxShadow: playbackSpeed === speed ? '0 2px 6px rgba(79, 70, 229, 0.2)' : 'none'
                                                }, children: [speed, "x"] }, speed))) })] })] }) })] })] }));
};
export default MapSection;
