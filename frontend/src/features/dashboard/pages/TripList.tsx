import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripApi } from '../../../services/tripApi';
import { Trip } from '../../../types/trip.types';
import { formatDistance, formatDuration, calculateTripDuration, formatDate } from '../../../utils/tripUtils';
import SearchIcon from '@mui/icons-material/Search';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TripList: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadTrips();
    }, []);

    useEffect(() => {
        filterTrips();
    }, [searchQuery, trips]);

    const loadTrips = async () => {
        try {
            const response = await tripApi.getUserTrips();
            setTrips(response.trips);
            setFilteredTrips(response.trips);
        } catch (error) {
            console.error('Failed to load trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterTrips = () => {
        if (!searchQuery.trim()) {
            setFilteredTrips(trips);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = trips.filter(
            (trip) =>
                trip.name.toLowerCase().includes(query) ||
                formatDate(trip.startTime).toLowerCase().includes(query)
        );
        setFilteredTrips(filtered);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="trip-list">
            {/* Search Bar */}
            <div className="dashboard-card" style={{ marginBottom: '24px' }}>
                <div style={{ position: 'relative' }}>
                    <SearchIcon
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#718096',
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search trips by name or date..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 48px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#667eea')}
                        onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                    />
                </div>
            </div>

            {/* Trips Grid */}
            {filteredTrips.length === 0 ? (
                <div className="dashboard-card">
                    <div className="empty-state">
                        <div className="empty-icon">🚗</div>
                        <h4 className="empty-title">
                            {searchQuery ? 'No trips found' : 'No trips yet'}
                        </h4>
                        <p className="empty-description">
                            {searchQuery
                                ? 'Try adjusting your search query'
                                : 'Upload your first GPS trip data to get started'}
                        </p>
                        {!searchQuery && (
                            <button className="btn-primary" onClick={() => navigate('/dashboard/upload')}>
                                Upload Trip
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                    {filteredTrips.map((trip) => (
                        <div
                            key={trip._id}
                            className="dashboard-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/dashboard/trips/${trip._id}`)}
                        >
                            {/* Trip Header */}
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2d3748', margin: '0 0 8px 0' }}>
                                    {trip.name}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#718096', fontSize: '13px' }}>
                                    <CalendarTodayIcon style={{ fontSize: 16 }} />
                                    <span>{formatDate(trip.startTime)}</span>
                                </div>
                            </div>

                            {/* Trip Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div
                                    style={{
                                        padding: '12px',
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <RouteIcon style={{ fontSize: 18, color: '#667eea' }} />
                                        <span style={{ fontSize: '12px', color: '#718096' }}>Distance</span>
                                    </div>
                                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#2d3748', margin: 0 }}>
                                        {formatDistance(trip.totalDistance)}
                                    </p>
                                </div>

                                <div
                                    style={{
                                        padding: '12px',
                                        background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <AccessTimeIcon style={{ fontSize: 18, color: '#4facfe' }} />
                                        <span style={{ fontSize: '12px', color: '#718096' }}>Duration</span>
                                    </div>
                                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#2d3748', margin: 0 }}>
                                        {formatDuration(calculateTripDuration(trip.startTime, trip.endTime))}
                                    </p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#718096' }}>
                                <span>Idling: {formatDuration(trip.totalIdlingTime)}</span>
                                <span>Stoppage: {formatDuration(trip.totalStoppageTime)}</span>
                            </div>

                            {/* View Button */}
                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/dashboard/trips/${trip._id}`);
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Results Count */}
            {filteredTrips.length > 0 && (
                <div style={{ marginTop: '24px', textAlign: 'center', color: '#718096', fontSize: '14px' }}>
                    Showing {filteredTrips.length} of {trips.length} trips
                </div>
            )}
        </div>
    );
};

export default TripList;
