import { useState, useEffect, useCallback } from 'react';
import { tripApi } from '../services/tripApi';
import { socketService } from '../services/socketService';
export const useTripData = (id) => {
    const [trip, setTrip] = useState(null);
    const [gpsPoints, setGpsPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadTripData = useCallback(async () => {
        if (!id)
            return;
        try {
            setLoading(true);
            const [tripData, gpsData] = await Promise.all([
                tripApi.getTripById(id),
                tripApi.getTripGPSPoints(id),
            ]);
            setTrip(tripData);
            setGpsPoints(gpsData.gpsPoints);
            setError(null);
        }
        catch (err) {
            console.error('Failed to load trip data:', err);
            setError('Failed to load trip data');
        }
        finally {
            setLoading(false);
        }
    }, [id]);
    useEffect(() => {
        loadTripData();
    }, [loadTripData]);
    return { trip, gpsPoints, setGpsPoints, loading, error, reload: loadTripData };
};
export const useRealTimeTrip = (id, onPointReceived) => {
    useEffect(() => {
        if (!id)
            return;
        const socket = socketService.connect();
        socketService.joinTrip(id);
        const handleLocationUpdate = (newPoint) => {
            if (onPointReceived) {
                onPointReceived(newPoint);
            }
        };
        socket.on('locationUpdate', handleLocationUpdate);
        return () => {
            socket.off('locationUpdate', handleLocationUpdate);
            socketService.disconnect();
        };
    }, [id, onPointReceived]);
};
