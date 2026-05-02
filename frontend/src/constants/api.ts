/**
 * API Endpoints
 * Centralized API route paths for backend communication
 */
export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
    },
    TRIP: {
        UPLOAD: '/trip/upload',
        USER_TRIPS: '/trip/user',
        GET_BY_ID: (id: string) => `/trip/${id}`,
        GET_GPS_POINTS: (id: string) => `/trip/${id}/gpspoints`,
        START_LIVE: '/trip/live/start',
        STOP_LIVE: (id: string) => `/trip/${id}/live/stop`,
    },
} as const;
