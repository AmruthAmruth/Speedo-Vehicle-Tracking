import api from './api';
import { API_ROUTES } from '../constants/api';
export const tripApi = {
    // Upload a trip CSV file
    uploadTrip: async (file, name) => {
        const formData = new FormData();
        formData.append('file', file);
        if (name) {
            formData.append('name', name);
        }
        const response = await api.post(API_ROUTES.TRIP.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getUserTrips: async () => {
        const response = await api.get(API_ROUTES.TRIP.USER_TRIPS);
        return response.data;
    },
    getActiveTrips: async () => {
        const response = await api.get(API_ROUTES.TRIP.USER_TRIPS);
        return response.data.trips.filter((trip) => trip.isActive);
    },
    getTripById: async (id) => {
        const response = await api.get(API_ROUTES.TRIP.GET_BY_ID(id));
        return response.data;
    },
    getTripGPSPoints: async (id) => {
        const response = await api.get(API_ROUTES.TRIP.GET_GPS_POINTS(id));
        return response.data;
    },
    startSimulation: async (id) => {
        await api.post(API_ROUTES.TRIP.SIMULATE_START(id));
    },
    stopSimulation: async (id) => {
        await api.post(API_ROUTES.TRIP.SIMULATE_STOP(id));
    },
    startLiveTrip: async (name, metadata) => {
        const response = await api.post(API_ROUTES.TRIP.START_LIVE, { name, metadata });
        return response.data;
    },
    stopLiveTrip: async (id) => {
        await api.post(API_ROUTES.TRIP.STOP_LIVE(id));
    },
    deleteTrip: async (id) => {
        await api.delete(API_ROUTES.TRIP.DELETE(id));
    },
};
