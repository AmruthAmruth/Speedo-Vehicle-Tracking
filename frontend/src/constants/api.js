/**
 * API Endpoints
 * Centralized API route paths for backend communication
 */
export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        PAIR: '/api/devices/pair',
        LINK: '/api/devices/link',
        VALIDATE_SECRET: '/api/devices/validate-secret',
    },
    TRIP: {
        UPLOAD: '/trip/upload',
        USER_TRIPS: '/trip/user',
        GET_BY_ID: (id) => `/trip/${id}`,
        GET_GPS_POINTS: (id) => `/trip/${id}/gpspoints`,
        START_LIVE: '/trip/live/start',
        STOP_LIVE: (id) => `/trip/${id}/live/stop`,
        SIMULATE_START: (id) => `/trip/${id}/simulate`,
        SIMULATE_STOP: (id) => `/trip/${id}/simulate/stop`,
        DELETE: (id) => `/trip/${id}`,
    },
};
