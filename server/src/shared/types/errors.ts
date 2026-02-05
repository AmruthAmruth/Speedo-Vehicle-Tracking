import { HTTP_STATUS } from '../constants/http.constants';

/**
 * Base Application Error class
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.BAD_REQUEST);
    }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.UNAUTHORIZED);
    }
}

/**
 * 403 Forbidden Error
 */
export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.FORBIDDEN);
    }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.NOT_FOUND);
    }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

/**
 * CSV Validation Error
 */
export class CSVValidationError extends BadRequestError {
    constructor(message: string) {
        super(message);
        this.name = 'CSVValidationError';
    }
}
