import rateLimit from 'express-rate-limit';
import { HTTP_MESSAGES, HTTP_STATUS } from '../shared/constants/http.constants';


export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        message: (HTTP_MESSAGES.GENERIC as unknown as { TOO_MANY_REQUESTS: string }).TOO_MANY_REQUESTS || 'Too many requests from this IP, please try again after 15 minutes',
    },
    statusCode: (HTTP_STATUS as unknown as { TOO_MANY_REQUESTS: number }).TOO_MANY_REQUESTS || 429,
});

/**
 * Auth Rate Limiter
 * Stricter limit for login/register routes to prevent brute-force attacks
 * Limit: 10 requests per 15 minutes
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many login attempts, please try again after 15 minutes',
    },
    statusCode: (HTTP_STATUS as unknown as { TOO_MANY_REQUESTS: number }).TOO_MANY_REQUESTS || 429,
});
