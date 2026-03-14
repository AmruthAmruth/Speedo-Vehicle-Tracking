"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.globalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_constants_1 = require("../shared/constants/http.constants");
exports.globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: http_constants_1.HTTP_MESSAGES.GENERIC.TOO_MANY_REQUESTS || 'Too many requests from this IP, please try again after 15 minutes',
    },
    statusCode: http_constants_1.HTTP_STATUS.TOO_MANY_REQUESTS || 429,
});
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many login attempts, please try again after 15 minutes',
    },
    statusCode: http_constants_1.HTTP_STATUS.TOO_MANY_REQUESTS || 429,
});
