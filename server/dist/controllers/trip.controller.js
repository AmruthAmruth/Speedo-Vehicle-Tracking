"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripGPSPoints = exports.getTripById = exports.getUserTrips = exports.uploadTrip = void 0;
const tripUpload_service_1 = require("../services/tripUpload.service");
const trip_repository_1 = require("../repositories/trip.repository");
const gpspoint_repository_1 = require("../repositories/gpspoint.repository");
const http_constants_1 = require("../constants/http.constants");
const service = new tripUpload_service_1.TripUploadService(new trip_repository_1.TripRepository(), new gpspoint_repository_1.GPSPointRepository());
const tripRepo = new trip_repository_1.TripRepository();
const gpsRepo = new gpspoint_repository_1.GPSPointRepository();
const uploadTrip = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
        }
        if (!req.file) {
            return res.status(http_constants_1.HTTP_STATUS.BAD_REQUEST).json({ message: http_constants_1.HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED });
        }
        const result = await service.uploadTrip(req.user.userId, req.file.buffer);
        res.status(http_constants_1.HTTP_STATUS.CREATED).json({
            message: http_constants_1.HTTP_MESSAGES.TRIP.TRIP_UPLOADED_SUCCESSFULLY,
            tripId: result.trip._id,
            startTime: result.trip.startTime,
            endTime: result.trip.endTime,
            gpsPointsProcessed: result.pointsCount
        });
    }
    catch (error) {
        if (error.name === 'CSVValidationError') {
            return res.status(http_constants_1.HTTP_STATUS.BAD_REQUEST).json({
                message: http_constants_1.HTTP_MESSAGES.TRIP.CSV_VALIDATION_FAILED,
                error: error.message
            });
        }
        if (error.message?.includes('Invalid file type')) {
            return res.status(http_constants_1.HTTP_STATUS.BAD_REQUEST).json({
                message: http_constants_1.HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE,
                error: error.message
            });
        }
        // Generic error
        res.status(http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP,
            error: error.message
        });
    }
};
exports.uploadTrip = uploadTrip;
const getUserTrips = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
        }
        const trips = await tripRepo.findByUserId(req.user.userId);
        res.status(http_constants_1.HTTP_STATUS.OK).json({
            trips,
            count: trips.length
        });
    }
    catch (error) {
        res.status(http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_TRIPS,
            error: error.message
        });
    }
};
exports.getUserTrips = getUserTrips;
const getTripById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
        }
        const { id } = req.params;
        const trip = await tripRepo.findById(id);
        if (!trip) {
            return res.status(http_constants_1.HTTP_STATUS.NOT_FOUND).json({ message: http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND });
        }
        if (trip.userId.toString() !== req.user.userId) {
            return res.status(http_constants_1.HTTP_STATUS.FORBIDDEN).json({ message: http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED });
        }
        res.status(http_constants_1.HTTP_STATUS.OK).json(trip);
    }
    catch (error) {
        res.status(http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_TRIP,
            error: error.message
        });
    }
};
exports.getTripById = getTripById;
const getTripGPSPoints = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(http_constants_1.HTTP_STATUS.UNAUTHORIZED).json({ message: http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
        }
        const { id } = req.params;
        const trip = await tripRepo.findById(id);
        if (!trip) {
            return res.status(http_constants_1.HTTP_STATUS.NOT_FOUND).json({ message: http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND });
        }
        if (trip.userId.toString() !== req.user.userId) {
            return res.status(http_constants_1.HTTP_STATUS.FORBIDDEN).json({ message: http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED });
        }
        const gpsPoints = await gpsRepo.findByTripId(id);
        res.status(http_constants_1.HTTP_STATUS.OK).json({
            gpsPoints,
            count: gpsPoints.length
        });
    }
    catch (error) {
        res.status(http_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_GPS_POINTS,
            error: error.message
        });
    }
};
exports.getTripGPSPoints = getTripGPSPoints;
