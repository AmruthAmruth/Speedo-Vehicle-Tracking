import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripApi } from '../../../services/tripApi';
import { authApi } from '../../../services/authApi';
import { useAuth } from '../../../context/AuthContext';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import SensorsIcon from '@mui/icons-material/Sensors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Dialog, IconButton, CircularProgress, } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import { socketService } from '../../../services/socketService';
import { Button, Card, Badge, } from '../../../components/shared/ui';
const LiveTracking = () => {
    const [activeTrips, setActiveTrips] = useState([]);
    const [previousLiveTrips, setPreviousLiveTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [pairingToken, setPairingToken] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [qrError, setQrError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const loadTrips = useCallback(async () => {
        try {
            const response = await tripApi.getUserTrips();
            const allTrips = response.trips;
            const sortedTrips = [...allTrips].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
            const active = sortedTrips.filter(t => t.isActive);
            const previous = sortedTrips.filter(t => !t.isActive &&
                (t.metadata?.source === 'simulation' || t.metadata?.source === 'mobile')).slice(0, 5);
            setActiveTrips(active);
            setPreviousLiveTrips(previous);
        }
        catch (error) {
            console.error('Failed to load trips:', error);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadTrips();
        const socket = socketService.connect();
        // Join user room using AuthContext instead of reading localStorage directly
        if (user?.id) {
            socketService.joinUserRoom(user.id);
        }
        const handleTripStarted = (trip) => {
            setActiveTrips(prev => {
                if (prev.find(t => t._id === trip._id))
                    return prev;
                return [trip, ...prev];
            });
            toast.info(`New tracking session started: ${trip.name}`);
        };
        const handleTripStopped = (trip) => {
            setActiveTrips(prev => prev.filter(t => t._id !== trip._id));
            setPreviousLiveTrips(prev => [trip, ...prev].slice(0, 5));
            toast.success(`Tracking session ended: ${trip.name}`);
        };
        socket.on('TRIP_STARTED', handleTripStarted);
        socket.on('TRIP_STOPPED', handleTripStopped);
        const interval = setInterval(loadTrips, 30000);
        return () => {
            clearInterval(interval);
            // Clean up socket listeners on unmount to prevent memory leaks
            socket.off('TRIP_STARTED', handleTripStarted);
            socket.off('TRIP_STOPPED', handleTripStopped);
        };
    }, [loadTrips, user?.id]);
    const handleStartLiveTracking = useCallback(async () => {
        setQrModalOpen(true);
        setIsGenerating(true);
        setQrError(null);
        setPairingToken(null);
        try {
            const response = await authApi.getPairingToken();
            if (response && response.pairingToken) {
                setPairingToken(response.pairingToken);
            }
            else {
                throw new Error('Invalid response from server');
            }
        }
        catch (err) {
            console.error('Failed to get pairing token:', err);
            setQrError('Could not generate pairing token. Please check your connection.');
        }
        finally {
            setIsGenerating(false);
        }
    }, []);
    const trackingUrl = pairingToken
        ? `${window.location.origin}/dashboard/track/p/${pairingToken}`
        : `${window.location.origin}/dashboard/track/new`;
    const copyToClipboard = useCallback(() => {
        if (trackingUrl) {
            navigator.clipboard.writeText(trackingUrl);
            toast.success('Link copied to clipboard!');
        }
    }, [trackingUrl]);
    const renderTripCard = useCallback((trip) => (_jsxs(Card, { className: "cursor-pointer overflow-hidden border-slate-100", onClick: () => navigate(`/dashboard/trips/${trip._id}`), children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx(Badge, { variant: "success", pulse: true, size: "sm", children: "LIVE" }), _jsx("h4", { className: "text-lg font-bold text-slate-900 line-clamp-1", children: trip.name }), _jsx("p", { className: "text-xs font-medium text-slate-500 uppercase tracking-wider", children: trip.metadata?.deviceName || 'Primary Device' })] }), _jsx("div", { className: "p-2 bg-slate-50 rounded-lg", children: _jsx(DirectionsCarIcon, { sx: { fontSize: 20, color: '#94a3b8' } }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 py-4 border-y border-slate-50", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-tight", children: "Started" }), _jsx("p", { className: "text-sm font-semibold text-slate-700", children: new Date(trip.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }), _jsxs("div", { className: "space-y-0.5", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-tight", children: "Mode" }), _jsx("p", { className: "text-sm font-semibold text-slate-700", children: trip.metadata?.source === 'simulation' ? 'Simulation' : 'Live GPS' })] })] }), _jsxs("div", { className: "mt-4 flex items-center justify-between text-brand-500 font-bold text-xs uppercase tracking-widest group", children: [_jsx("span", { children: "View Real-time Feed" }), _jsx(ArrowForwardIosIcon, { sx: { fontSize: 10 }, className: "transition-transform group-hover:translate-x-1" })] })] }, trip._id)), [navigate]);
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-4", children: [_jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-brand-500" }), _jsx("p", { className: "text-sm font-medium text-slate-500 animate-pulse", children: "Initializing feed..." })] }));
    }
    return (_jsxs("div", { className: "max-w-6xl mx-auto px-6 py-10 animate-fade-in", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-4xl font-display font-bold text-slate-900 tracking-tight", children: "Live Tracking" }), _jsx("p", { className: "text-slate-500 text-lg", children: "Monitor your fleet's active sessions in real-time." })] }), _jsx(Button, { size: "lg", onClick: handleStartLiveTracking, leftIcon: _jsx(GpsFixedIcon, { sx: { fontSize: 20 } }), className: "shadow-glow", children: "Start New Session" })] }), _jsxs("main", { className: "space-y-16", children: [_jsxs("section", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-8", children: [_jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Active Vehicles" }), _jsx(Badge, { variant: "secondary", children: activeTrips.length })] }), activeTrips.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center p-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 text-center", children: [_jsx("div", { className: "p-4 bg-white rounded-2xl shadow-sm mb-4", children: _jsx(SensorsIcon, { sx: { fontSize: 40, color: '#cbd5e1' } }) }), _jsx("p", { className: "text-slate-500 font-medium mb-6", children: "No active sessions found. Start tracking to see live data." }), _jsx(Button, { variant: "outline", onClick: handleStartLiveTracking, children: "Initiate Tracking" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: activeTrips.map(trip => renderTripCard(trip)) }))] }), previousLiveTrips.length > 0 && (_jsxs("section", { className: "animate-slide-up", children: [_jsx("div", { className: "flex items-center gap-3 mb-6", children: _jsx("h2", { className: "text-xl font-bold text-slate-800", children: "Recent Activity" }) }), _jsx("div", { className: "bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-premium", children: previousLiveTrips.map((trip, idx) => (_jsxs("div", { className: `flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors ${idx !== previousLiveTrips.length - 1 ? 'border-b border-slate-50' : ''}`, onClick: () => navigate(`/dashboard/trips/${trip._id}`), children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-brand-500 transition-colors", children: _jsx(HistoryIcon, { sx: { fontSize: 20 } }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-slate-900", children: trip.name }), _jsxs("p", { className: "text-xs text-slate-500 font-medium uppercase tracking-wider", children: [trip.metadata?.deviceName || 'Mobile', " \u2022 ", new Date(trip.startTime).toLocaleDateString()] })] })] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-bold text-slate-700", children: [(trip.totalDistance || 0).toFixed(1), " km"] }), _jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "Distance" })] }), _jsx(ArrowForwardIosIcon, { sx: { fontSize: 12, color: '#cbd5e1' } })] })] }, trip._id))) })] }))] }), _jsx(Dialog, { open: qrModalOpen, onClose: () => setQrModalOpen(false), PaperProps: {
                    sx: {
                        borderRadius: '24px',
                        maxWidth: '440px',
                        width: '100%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                        m: 2
                    }
                }, children: _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h3", { className: "text-2xl font-display font-bold text-slate-900", children: "Link Device" }), _jsx(IconButton, { onClick: () => setQrModalOpen(false), size: "small", className: "hover:bg-slate-100 rounded-full", children: _jsx(CloseIcon, { sx: { fontSize: 20 } }) })] }), _jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsx("div", { className: "p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-8 w-full max-w-[240px] aspect-square flex items-center justify-center", children: isGenerating ? (_jsx(CircularProgress, { size: 48, thickness: 4, sx: { color: '#435cf0' } })) : qrError ? (_jsxs("div", { className: "space-y-3", children: [_jsx(ErrorOutlineIcon, { sx: { fontSize: 48, color: '#ef4444' } }), _jsx("p", { className: "text-sm font-medium text-error", children: qrError })] })) : (_jsx("div", { className: "p-2 bg-white rounded-xl shadow-sm", children: _jsx(QRCodeSVG, { value: trackingUrl, size: 180, level: "M" }) })) }), !qrError && !isGenerating && (_jsxs("div", { className: "space-y-6 w-full", children: [_jsx("p", { className: "text-slate-500 leading-relaxed font-medium", children: "Scan the code with your mobile device to link it instantly and start tracking." }), _jsx(Button, { variant: "outline", className: "w-full py-6 rounded-2xl border-slate-200", leftIcon: _jsx(ContentCopyIcon, { sx: { fontSize: 18 } }), onClick: copyToClipboard, children: "Copy Link" }), _jsx(Button, { className: "w-full py-6 rounded-2xl", onClick: () => setQrModalOpen(false), children: "Done" })] }))] })] }) })] }));
};
export default LiveTracking;
