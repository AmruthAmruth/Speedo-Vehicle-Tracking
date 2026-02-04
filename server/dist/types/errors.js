"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVValidationError = exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
const http_constants_1 = require("../constants/http.constants");
/**
 * Base Application Error class
 */
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
/**
 * 400 Bad Request Error
 */
class BadRequestError extends AppError {
    constructor(message) {
        super(message, http_constants_1.HTTP_STATUS.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * 401 Unauthorized Error
 */
class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, http_constants_1.HTTP_STATUS.UNAUTHORIZED);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * 403 Forbidden Error
 */
class ForbiddenError extends AppError {
    constructor(message) {
        super(message, http_constants_1.HTTP_STATUS.FORBIDDEN);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * 404 Not Found Error
 */
class NotFoundError extends AppError {
    constructor(message) {
        super(message, http_constants_1.HTTP_STATUS.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * 500 Internal Server Error
 */
class InternalServerError extends AppError {
    constructor(message) {
        super(message, http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerError = InternalServerError;
/**
 * CSV Validation Error
 */
class CSVValidationError extends BadRequestError {
    constructor(message) {
        super(message);
        this.name = 'CSVValidationError';
    }
}
exports.CSVValidationError = CSVValidationError;
