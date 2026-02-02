import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripApi } from '../../../services/tripApi';
import { Trip } from '../../../types/trip.types';
import { formatDistance, formatDuration, calculateTripDuration } from '../../../utils/tripUtils';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DashboardOverview: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            const response = await tripApi.getUserTrips();
            setTrips(response.trips);
        } catch (error) {
            console.error('Failed to load trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = () => {
        const totalTrips = trips.length;
        const totalDistance = trips.reduce((sum, trip) => sum + trip.totalDistance, 0);
        const totalDuration = trips.reduce((sum, trip) =>
            sum + calculateTripDuration(trip.startTime, trip.endTime), 0
        );
        const totalIdling = trips.reduce((sum, trip) => sum + trip.totalIdlingTime, 0);

        return {
            totalTrips,
            totalDistance,
            totalDuration,
            totalIdling,
        };
    };

    const stats = calculateStats();
    const recentTrips = trips.slice(0, 5);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-overview">
            {/* Welcome Section */}
            <div className="welcome-section mb-8">
                <h2 className="text-3xl font-bold text-text-primary mb-2">
                    Welcome to Your Dashboard
                </h2>
                <p className="text-base text-text-secondary">
                    Track and analyze your vehicle trips with precision
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <DashboardIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Trips</p>
                        <h3 className="stat-value">{stats.totalTrips}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-gradient-to-br from-accent-violet to-accent-rose">
                        <RouteIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Distance</p>
                        <h3 className="stat-value">{formatDistance(stats.totalDistance)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-gradient-to-br from-accent-blue to-accent-teal">
                        <AccessTimeIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Duration</p>
                        <h3 className="stat-value">{formatDuration(stats.totalDuration)}</h3>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-gradient-to-br from-accent-rose to-accent-amber">
                        <SpeedIcon style={{ fontSize: 28 }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Total Idling</p>
                        <h3 className="stat-value">{formatDuration(stats.totalIdling)}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card" style={{ marginBottom: '30px' }}>
                <div className="card-header">
                    <h3 className="card-title">Quick Actions</h3>
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <button className="btn-primary" onClick={() => navigate('/dashboard/upload')}>
                        <UploadFileIcon />
                        Upload New Trip
                    </button>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard/trips')}>
                        View All Trips
                    </button>
                </div>
            </div>

            {/* Recent Trips */}
            <div className="dashboard-card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">Recent Trips</h3>
                        <p className="card-subtitle">Your latest 5 trips</p>
                    </div>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard/trips')}>
                        View All
                    </button>
                </div>

                {recentTrips.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📍</div>
                        <h4 className="empty-title">No trips yet</h4>
                        <p className="empty-description">Upload your first GPS trip data to get started</p>
                        <button className="btn-primary" onClick={() => navigate('/dashboard/upload')}>
                            <UploadFileIcon />
                            Upload Trip
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-light-border">
                                    <th className="p-3 text-left text-text-secondary font-semibold">Trip Name</th>
                                    <th className="p-3 text-left text-text-secondary font-semibold">Date</th>
                                    <th className="p-3 text-left text-text-secondary font-semibold">Distance</th>
                                    <th className="p-3 text-left text-text-secondary font-semibold">Duration</th>
                                    <th className="p-3 text-left text-text-secondary font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTrips.map((trip) => (
                                    <tr key={trip._id} className="border-b border-light-border">
                                        <td className="p-4 font-semibold text-text-primary">{trip.name}</td>
                                        <td className="p-4 text-text-secondary">
                                            {new Date(trip.startTime).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-text-secondary">
                                            {formatDistance(trip.totalDistance)}
                                        </td>
                                        <td className="p-4 text-text-secondary">
                                            {formatDuration(calculateTripDuration(trip.startTime, trip.endTime))}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="btn-secondary text-sm px-4 py-2"
                                                onClick={() => navigate(`/dashboard/trips/${trip._id}`)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardOverview;
