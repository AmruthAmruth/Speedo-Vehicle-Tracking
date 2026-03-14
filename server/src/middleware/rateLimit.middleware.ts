import rateLimit from 'express-rate-limit';
import { HTTP_MESSAGES, HTTP_STATUS } from '../shared/constants/http.constants';


export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    max: 100,  
    standardHeaders: true,  
    legacyHeaders: false,  
    message: {
        message: (HTTP_MESSAGES.GENERIC as unknown as { TOO_MANY_REQUESTS: string }).TOO_MANY_REQUESTS || 'Too many requests from this IP, please try again after 15 minutes',
    },
    statusCode: (HTTP_STATUS as unknown as { TOO_MANY_REQUESTS: number }).TOO_MANY_REQUESTS || 429,
});

 
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  
    max: 10,  
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many login attempts, please try again after 15 minutes',
    },
    statusCode: (HTTP_STATUS as unknown as { TOO_MANY_REQUESTS: number }).TOO_MANY_REQUESTS || 429,
});
