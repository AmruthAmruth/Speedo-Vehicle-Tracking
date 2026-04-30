import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripApi } from '../../../services/tripApi';
import { Trip, GPSPoint } from '../../../types/trip.types';
import { formatDistance, formatDuration, calculateTripDuration, formatDate, formatSpeed } from '../../../utils/tripUtils';
import TripMap from '../components/TripMap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { socketService } from '../../../services/socketService';

const TripDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [gpsPoints, setGpsPoints] = useState<GPSPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [speedLimit, setSpeedLimit] = useState(80);
    const [showStoppages, setShowStoppages] = useState(true);
    const [showIdling, setShowIdling] = useState(true);
    const [isSimulating, setIsSimulating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        if (id) {
            loadTripData();

            // Initialize Real-Time Socket Connection
            const socket = socketService.connect();
            socketService.joinTrip(id);

            const handleLocationUpdate = (newPoint: GPSPoint) => {
                console.log('📍 Real-time point received:', newPoint);
                setGpsPoints(prev => {
                    if (prev.some(p => p._id === newPoint._id)) return prev;
                    return [...prev, newPoint];
                });
            };

            socket.on('locationUpdate', handleLocationUpdate);
            
            return () => {
                socket.off('locationUpdate', handleLocationUpdate);
                socketService.disconnect();
            };
        }
    }, [id]);

    const loadTripData = async () => {
        try {
            const [tripData, gpsData] = await Promise.all([
                tripApi.getTripById(id!),
                tripApi.getTripGPSPoints(id!),
            ]);
            setTrip(tripData);
            setGpsPoints(gpsData.gpsPoints);
        } catch (error) {
            console.error('Failed to load trip data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartSimulation = async () => {
        try {
            setIsSimulating(true);
            // Clear existing points so we can watch them be added live
            setGpsPoints([]);
            await tripApi.startSimulation(id!);
            console.log('🚀 Simulation started');
        } catch (error) {
            console.error('Failed to start simulation:', error);
            setIsSimulating(false);
        }
    };

    const handleStopSimulation = async () => {
        try {
            await tripApi.stopSimulation(id!);
            setIsSimulating(false);
            setLoading(true);
            await loadTripData(); // Reload full trip to show the whole path
            console.log('🛑 Simulation stopped');
        } catch (error) {
            console.error('Failed to stop simulation:', error);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="dashboard-card">
                <div className="empty-state">
                    <div className="empty-icon">❌</div>
                    <h4 className="empty-title">Trip not found</h4>
                    <p className="empty-description">The trip you're looking for doesn't exist</p>
                    <button className="btn-primary" onClick={() => navigate('/dashboard/trips')}>
                        Back to Trips
                    </button>
                </div>
            </div>
        );
    }

    const duration = calculateTripDuration(trip.startTime, trip.endTime);
    const avgSpeed = duration > 0 ? (trip.totalDistance / 1000) / (duration / 3600) : 0;
    const maxSpeed = Math.max(...gpsPoints.map(p => p.speed), 0);

    return (
        <div className="trip-details">
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard/trips')}>
                        <ArrowBackIcon style={{ fontSize: 18 }} />
                        Back to Trips
                    </button>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {!isSimulating ? (
                            <button
                                className="btn-primary"
                                onClick={handleStartSimulation}
                                style={{ 
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                🚀 Simulate Live Trip
                            </button>
                        ) : (
                            <button
                                className="btn-primary"
                                onClick={handleStopSimulation}
                                style={{ 
                                    background: '#EF4444', 
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                🛑 Stop Simulation
                            </button>
                        )}
                    </div>
                </div>          
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2d3748', margin: '0 0 8px 0' }}>
                    {trip.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#718096', margin: 0 }}>
                    {formatDate(trip.startTime)} - {formatDate(trip.endTime)}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-card">
                    <div className="stat-icon">
                        <RouteIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Distance</p>
                        <h3 className="stat-value">{formatDistance(trip.totalDistance)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <AccessTimeIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Duration</p>
                        <h3 className="stat-value">{formatDuration(duration)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <SpeedIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Avg Speed</p>
                        <h3 className="stat-value">{formatSpeed(avgSpeed)}</h3>
                        <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0 0' }}>
                            Max: {formatSpeed(maxSpeed)}
                        </p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <PauseCircleIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Idling Time</p>
                        <h3 className="stat-value">{formatDuration(trip.totalIdlingTime)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
                        <StopCircleIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Stoppage Time</p>
                        <h3 className="stat-value">{formatDuration(trip.totalStoppageTime)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                        <LocationOnIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">GPS Points</p>
                        <h3 className="stat-value">{gpsPoints.length}</h3>
                    </div>
                </div>
            </div>

            {/* Map Visualization */}
            <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                    <div>
                        <h3 className="card-title">Trip Route</h3>
                        <p className="card-subtitle">Interactive map with overspeed, stoppages, and idling detection</p>
                    </div>
                </div>

                {/* Map Controls */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label htmlFor="speedLimit" style={{ fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>
                            Speed Limit:
                        </label>
                        <input
                            type="number"
                            id="speedLimit"
                            value={speedLimit}
                            onChange={(e) => setSpeedLimit(Number(e.target.value))}
                            min="20"
                            max="200"
                            step="10"
                            style={{
                                width: '80px',
                                padding: '6px 10px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: 600
                            }}
                        />
                        <span style={{ fontSize: '14px', color: '#6b7280' }}>km/h</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={showStoppages}
                                onChange={(e) => setShowStoppages(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '14px', color: '#4b5563' }}>Show Stoppages</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={showIdling}
                                onChange={(e) => setShowIdling(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '14px', color: '#4b5563' }}>Show Idling</span>
                        </label>
                    </div>
                </div>

                {/* Map Component */}
                <TripMap
                    gpsPoints={gpsPoints}
                    tripName={trip.name}
                    speedLimit={speedLimit}
                    showStoppages={showStoppages}
                    showIdling={showIdling}
                />
            </div>

            {/* GPS Points Table */}
            <div className="dashboard-card">
                <div className="card-header">
                    <h3 className="card-title">GPS Points</h3>
                    <p className="card-subtitle">{gpsPoints.length} points recorded</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>#</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>Timestamp</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>Latitude</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>Longitude</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>Speed</th>
                                <th style={{ padding: '12px', textAlign: 'left', color: '#718096', fontWeight: 600 }}>Ignition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gpsPoints
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((point, index) => (
                                    <tr 
                                        key={point._id} 
                                        style={{ 
                                            borderBottom: '1px solid #f1f5f9',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <td style={{ padding: '12px', color: '#94a3b8', fontSize: '13px' }}>
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                    <td style={{ padding: '12px', color: '#2d3748', fontSize: '13px' }}>
                                        {new Date(point.timestamp).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '12px', color: '#718096', fontFamily: 'monospace' }}>
                                        {point.latitude.toFixed(6)}
                                    </td>
                                    <td style={{ padding: '12px', color: '#718096', fontFamily: 'monospace' }}>
                                        {point.longitude.toFixed(6)}
                                    </td>
                                    <td style={{ padding: '12px', color: '#2d3748' }}>
                                        {formatSpeed(point.speed)}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                background: point.ignition ? '#d1fae5' : '#fee2e2',
                                                color: point.ignition ? '#065f46' : '#991b1b',
                                            }}
                                        >
                                            {point.ignition ? 'ON' : 'OFF'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Control */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderTop: '1px solid #f1f5f9',
                    background: '#ffffff',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                            Showing <span style={{ fontWeight: 600, color: '#1e293b' }}>
                                {gpsPoints.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
                                {Math.min(gpsPoints.length, currentPage * itemsPerPage)}
                            </span> of <span style={{ fontWeight: 600, color: '#1e293b' }}>{gpsPoints.length}</span> points
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', color: '#64748b' }}>Rows per page:</span>
                            <select 
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                style={{
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '13px',
                                    color: '#475569',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: currentPage === 1 ? '#f8fafc' : '#ffffff',
                                color: currentPage === 1 ? '#cbd5e1' : '#475569',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: currentPage === 1 ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage !== 1) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                    e.currentTarget.style.color = '#6366f1';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage !== 1) {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.color = '#475569';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            Previous
                        </button>

                        <div style={{ display: 'flex', gap: '6px' }}>
                            {/* Simple dynamic pagination numbers */}
                            {Array.from({ length: Math.ceil(gpsPoints.length / itemsPerPage) }, (_, i) => {
                                const pageNum = i + 1;
                                const totalPages = Math.ceil(gpsPoints.length / itemsPerPage);
                                
                                // Show first, last, and pages around current
                                if (
                                    pageNum === 1 || 
                                    pageNum === totalPages || 
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '8px',
                                                border: '1px solid',
                                                borderColor: currentPage === pageNum ? '#6366f1' : '#e2e8f0',
                                                background: currentPage === pageNum ? '#6366f1' : '#ffffff',
                                                color: currentPage === pageNum ? '#ffffff' : '#475569',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: currentPage === pageNum ? '0 4px 6px -1px rgba(99, 102, 241, 0.4)' : 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (currentPage !== pageNum) {
                                                    e.currentTarget.style.borderColor = '#6366f1';
                                                    e.currentTarget.style.color = '#6366f1';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (currentPage !== pageNum) {
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                    e.currentTarget.style.color = '#475569';
                                                }
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                                
                                if (
                                    (pageNum === 2 && currentPage > 3) || 
                                    (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                                ) {
                                    return <span key={pageNum} style={{ color: '#94a3b8', padding: '0 4px', alignSelf: 'center' }}>...</span>;
                                }

                                return null;
                            })}
                        </div>

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(gpsPoints.length / itemsPerPage), prev + 1))}
                            disabled={currentPage >= Math.ceil(gpsPoints.length / itemsPerPage) || gpsPoints.length === 0}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: (currentPage >= Math.ceil(gpsPoints.length / itemsPerPage) || gpsPoints.length === 0) ? '#f8fafc' : '#ffffff',
                                color: (currentPage >= Math.ceil(gpsPoints.length / itemsPerPage) || gpsPoints.length === 0) ? '#cbd5e1' : '#475569',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: (currentPage >= Math.ceil(gpsPoints.length / itemsPerPage) || gpsPoints.length === 0) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: (currentPage >= Math.ceil(gpsPoints.length / itemsPerPage) || gpsPoints.length === 0) ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
                            }}
                            onMouseEnter={(e) => {
                                if (currentPage < Math.ceil(gpsPoints.length / itemsPerPage)) {
                                    e.currentTarget.style.borderColor = '#6366f1';
                                    e.currentTarget.style.color = '#6366f1';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentPage < Math.ceil(gpsPoints.length / itemsPerPage)) {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.color = '#475569';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
