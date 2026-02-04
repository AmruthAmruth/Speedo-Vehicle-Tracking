"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to the error handling middleware
 * This eliminates the need for try-catch blocks in every controller
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
