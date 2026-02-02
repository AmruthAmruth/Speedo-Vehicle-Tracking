import api from './api';
import { TripUploadResponse, GetTripsResponse, Trip, GetGPSPointsResponse } from '../types/trip.types';

export const tripApi = {
    // Upload a trip CSV file
    uploadTrip: async (file: File): Promise<TripUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<TripUploadResponse>('/trip/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get all trips for the authenticated user
    getUserTrips: async (): Promise<GetTripsResponse> => {
        const response = await api.get<GetTripsResponse>('/trip/user');
        return response.data;
    },

    // Get a specific trip by ID
    getTripById: async (id: string): Promise<Trip> => {
        const response = await api.get<Trip>(`/trip/${id}`);
        return response.data;
    },

    // Get GPS points for a specific trip
    getTripGPSPoints: async (id: string): Promise<GetGPSPointsResponse> => {
        const response = await api.get<GetGPSPointsResponse>(`/trip/${id}/gpspoints`);
        return response.data;
    },
};
