import { HTTP_STATUS } from '../constants/http.constants';

 
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

 
export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.BAD_REQUEST);
    }
}

 
export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.UNAUTHORIZED);
    }
}

 
export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.FORBIDDEN);
    }
}

 
export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.NOT_FOUND);
    }
}

 
export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}

 
export class CSVValidationError extends BadRequestError {
    constructor(message: string) {
        super(message);
        this.name = 'CSVValidationError';
    }
}
