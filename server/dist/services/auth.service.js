"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const password_util_1 = require("../utils/password.util");
const http_constants_1 = require("../constants/http.constants");
class AuthService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async register(data) {
        const existingUser = await this._userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error(http_constants_1.HTTP_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
        }
        const hashedPassword = await (0, password_util_1.hashPassword)(data.password);
        const user = await this._userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
        return {
            id: user._id,
            name: user.name,
            email: user.email
        };
    }
    async login(data) {
        const user = await this._userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error(http_constants_1.HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
        }
        const isPasswordValid = await (0, password_util_1.comparePassword)(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error(http_constants_1.HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
        }
        const token = (0, jwt_util_1.generateToken)({
            userId: user._id.toString(),
            email: user.email
        });
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        };
    }
}
exports.AuthService = AuthService;
