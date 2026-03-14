"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_util_1 = require("../shared/utils/jwt.util");
const password_util_1 = require("../shared/utils/password.util");
const http_constants_1 = require("../shared/constants/http.constants");
const errors_1 = require("../shared/types/errors");
const tsyringe_1 = require("tsyringe");
let AuthService = class AuthService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async register(data) {
        const existingUser = await this._userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
        }
        const hashedPassword = await (0, password_util_1.hashPassword)(data.password);
        const user = await this._userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };
    }
    async login(data) {
        const user = await this._userRepository.findByEmail(data.email);
        if (!user) {
            throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
        }
        const isPasswordValid = await (0, password_util_1.comparePassword)(data.password, user.password);
        if (!isPasswordValid) {
            throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IUserRepository')),
    __metadata("design:paramtypes", [Object])
], AuthService);
