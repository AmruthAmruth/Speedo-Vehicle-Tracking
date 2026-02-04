/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * HTTP Response Messages
 */
export const HTTP_MESSAGES = {
    // Authentication Messages
    AUTH: {
        USER_NOT_AUTHENTICATED: 'User not authenticated',
        AUTHORIZATION_TOKEN_MISSING: 'Authorization token missing',
        INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token',
        EMAIL_ALREADY_EXISTS: 'Email already exists',
        INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    },

    // Trip Messages
    TRIP: {
        NO_FILE_UPLOADED: 'No file uploaded',
        TRIP_UPLOADED_SUCCESSFULLY: 'Trip uploaded successfully',
        CSV_VALIDATION_FAILED: 'CSV validation failed',
        INVALID_FILE_TYPE: 'Invalid file type',
        FAILED_TO_UPLOAD_TRIP: 'Failed to upload trip',
        FAILED_TO_FETCH_TRIPS: 'Failed to fetch trips',
        TRIP_NOT_FOUND: 'Trip not found',
        ACCESS_DENIED: 'Access denied',
        FAILED_TO_FETCH_TRIP: 'Failed to fetch trip',
        FAILED_TO_FETCH_GPS_POINTS: 'Failed to fetch GPS points',
    },

    // Generic Messages
    GENERIC: {
        INSUFFICIENT_GPS_POINTS: (min: number, found: number) =>
            `Insufficient GPS points. At least ${min} points are required, but only ${found} found.`,
    },
} as const;
