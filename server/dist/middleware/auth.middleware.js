"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_constants_1 = require("../constants/http.constants");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({
                message: http_constants_1.HTTP_MESSAGES.AUTH.AUTHORIZATION_TOKEN_MISSING
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({
            message: http_constants_1.HTTP_MESSAGES.AUTH.INVALID_OR_EXPIRED_TOKEN
        });
    }
};
exports.authMiddleware = authMiddleware;
