import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/types/errors';
import { HTTP_STATUS } from '../shared/constants/http.constants';

/**
 * Global Error Handler Middleware
 * This middleware catches all errors thrown in the application
 */
export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Default error values
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: string | undefined;

    // Handle AppError instances
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        // Handle generic errors
        error = err.message;
    }

    // Log error for debugging (in production, use proper logging service)
    console.error('Error:', {
        statusCode,
        message,
        error: error || err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    // Send error response
    interface ErrorResponse {
        message: string;
        error?: string;
        stack?: string;
    }

    const response: ErrorResponse = {
        message,
    };

    // Include error details only if it exists
    if (error) {
        response.error = error;
    }

    // In development, include stack trace
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

/**
 * 404 Not Found Handler
 * This middleware handles routes that don't exist
 */
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        message: `Route ${req.originalUrl} not found`,
    });
};
