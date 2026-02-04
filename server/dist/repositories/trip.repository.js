"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRepository = void 0;
const Trip_model_1 = require("../models/Trip.model");
class TripRepository {
    async create(data, session) {
        if (session) {
            return Trip_model_1.TripModel.create([data], { session }).then(trips => trips[0]);
        }
        return Trip_model_1.TripModel.create(data);
    }
    async findByUserId(userId) {
        return Trip_model_1.TripModel.find({ userId })
            .sort({ startTime: -1 })
            .lean();
    }
    async findById(id) {
        return Trip_model_1.TripModel.findById(id).lean();
    }
}
exports.TripRepository = TripRepository;
