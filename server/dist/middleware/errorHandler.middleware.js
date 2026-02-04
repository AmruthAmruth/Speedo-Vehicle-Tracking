"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errors_1 = require("../types/errors");
const http_constants_1 = require("../constants/http.constants");
/**
 * Global Error Handler Middleware
 * This middleware catches all errors thrown in the application
 */
const errorHandler = (err, req, res, next) => {
    // Default error values
    let statusCode = http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error;
    // Handle AppError instances
    if (err instanceof errors_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else {
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
    const response = {
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
exports.errorHandler = errorHandler;
/**
 * 404 Not Found Handler
 * This middleware handles routes that don't exist
 */
const notFoundHandler = (req, res, next) => {
    res.status(http_constants_1.HTTP_STATUS.NOT_FOUND).json({
        message: `Route ${req.originalUrl} not found`,
    });
};
exports.notFoundHandler = notFoundHandler;
