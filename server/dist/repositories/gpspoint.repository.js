"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPSPointRepository = void 0;
const GPSPoint_model_1 = require("../models/GPSPoint.model");
class GPSPointRepository {
    async bulkCreate(points, session) {
        if (session) {
            return GPSPoint_model_1.GPSPointModel.insertMany(points, { session });
        }
        return GPSPoint_model_1.GPSPointModel.insertMany(points);
    }
    async findByTripId(tripId) {
        return GPSPoint_model_1.GPSPointModel.find({ tripId })
            .sort({ timestamp: 1 })
            .lean();
    }
}
exports.GPSPointRepository = GPSPointRepository;
