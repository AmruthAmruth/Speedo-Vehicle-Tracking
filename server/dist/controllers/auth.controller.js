"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const user_repository_1 = require("../repositories/user.repository");
const http_constants_1 = require("../constants/http.constants");
const asyncHandler_1 = require("../utils/asyncHandler");
const authService = new auth_service_1.AuthService(new user_repository_1.UserRepository());
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(http_constants_1.HTTP_STATUS.CREATED).json(user);
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(http_constants_1.HTTP_STATUS.OK).json(result);
});
