"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripUploadService = void 0;
const csv_service_1 = require("./csv.service");
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const geolib_1 = require("geolib");
const http_constants_1 = require("../constants/http.constants");
class TripUploadService {
    constructor(_tripRepo, _gpsRepo) {
        this._tripRepo = _tripRepo;
        this._gpsRepo = _gpsRepo;
    }
    async uploadTrip(userId, fileBuffer) {
        // 1. Parse CSV
        const rows = await (0, csv_service_1.parseCSV)(fileBuffer);
        // 2. Validate minimum GPS points
        const MIN_GPS_POINTS = 2;
        if (rows.length < MIN_GPS_POINTS) {
            throw new Error(http_constants_1.HTTP_MESSAGES.GENERIC.INSUFFICIENT_GPS_POINTS(MIN_GPS_POINTS, rows.length));
        }
        // 3. Start a transaction session
        const session = await mongoose_2.default.startSession();
        session.startTransaction();
        try {
            // 4. Create Trip
            const trip = await this._tripRepo.create({
                userId: new mongoose_1.Types.ObjectId(userId),
                startTime: new Date(rows[0].timestamp),
                endTime: new Date(rows[rows.length - 1].timestamp)
            }, session);
            // 5. Calculate speed for each GPS point
            const gpsPoints = rows.map(row => ({
                tripId: trip._id,
                latitude: row.latitude,
                longitude: row.longitude,
                timestamp: new Date(row.timestamp),
                ignition: row.ignition === 'ON',
                speed: 0 // Will be calculated below
            }));
            // Calculate speed between consecutive points
            for (let i = 1; i < gpsPoints.length; i++) {
                const prev = gpsPoints[i - 1];
                const curr = gpsPoints[i];
                // Calculate distance in meters using geolib
                const distance = (0, geolib_1.getDistance)({ latitude: prev.latitude, longitude: prev.longitude }, { latitude: curr.latitude, longitude: curr.longitude });
                // Calculate time difference in seconds
                const timeDiff = (curr.timestamp.getTime() - prev.timestamp.getTime()) / 1000;
                // Calculate speed in km/h: (distance_meters / time_seconds) * 3.6
                if (timeDiff > 0) {
                    curr.speed = (distance / timeDiff) * 3.6;
                }
                else {
                    // If timestamps are identical, speed is 0
                    curr.speed = 0;
                }
            }
            // First point has speed 0 (no previous point to compare)
            // 6. Save GPS Points with calculated speeds
            await this._gpsRepo.bulkCreate(gpsPoints, session);
            // 7. Commit transaction
            await session.commitTransaction();
            return {
                trip,
                pointsCount: gpsPoints.length
            };
        }
        catch (error) {
            // Rollback transaction on error
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
}
exports.TripUploadService = TripUploadService;
