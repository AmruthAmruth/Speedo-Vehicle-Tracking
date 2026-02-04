"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async findByEmail(email) {
        return User_model_1.UserModel.findOne({ email });
    }
    async create(user) {
        return User_model_1.UserModel.create(user);
    }
}
exports.UserRepository = UserRepository;
