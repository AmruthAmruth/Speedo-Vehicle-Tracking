"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const user_repository_1 = require("../repositories/user.repository");
const http_constants_1 = require("../constants/http.constants");
const authService = new auth_service_1.AuthService(new user_repository_1.UserRepository());
const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(http_constants_1.HTTP_STATUS.CREATED).json(user);
    }
    catch (error) {
        res.status(http_constants_1.HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(http_constants_1.HTTP_STATUS.OK).json(result);
    }
    catch (error) {
        res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: error.message });
    }
};
exports.login = login;
