"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripGPSPoints = exports.getTripById = exports.getUserTrips = exports.uploadTrip = void 0;
const tripUpload_service_1 = require("../services/tripUpload.service");
const trip_repository_1 = require("../repositories/trip.repository");
const gpspoint_repository_1 = require("../repositories/gpspoint.repository");
const http_constants_1 = require("../constants/http.constants");
const asyncHandler_1 = require("../utils/asyncHandler");
const errors_1 = require("../types/errors");
const service = new tripUpload_service_1.TripUploadService(new trip_repository_1.TripRepository(), new gpspoint_repository_1.GPSPointRepository());
const tripRepo = new trip_repository_1.TripRepository();
const gpsRepo = new gpspoint_repository_1.GPSPointRepository();
exports.uploadTrip = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }
    if (!req.file) {
        throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED);
    }
    try {
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
            throw new errors_1.CSVValidationError(error.message);
        }
        if (error.message?.includes('Invalid file type')) {
            throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE);
        }
        throw new errors_1.InternalServerError(http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP);
    }
});
exports.getUserTrips = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }
    const trips = await tripRepo.findByUserId(req.user.userId);
    res.status(http_constants_1.HTTP_STATUS.OK).json({
        trips,
        count: trips.length
    });
});
exports.getTripById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }
    const { id } = req.params;
    const trip = await tripRepo.findById(id);
    if (!trip) {
        throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
    }
    if (trip.userId.toString() !== req.user.userId) {
        throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
    }
    res.status(http_constants_1.HTTP_STATUS.OK).json(trip);
});
exports.getTripGPSPoints = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }
    const { id } = req.params;
    const trip = await tripRepo.findById(id);
    if (!trip) {
        throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
    }
    if (trip.userId.toString() !== req.user.userId) {
        throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
    }
    const gpsPoints = await gpsRepo.findByTripId(id);
    res.status(http_constants_1.HTTP_STATUS.OK).json({
        gpsPoints,
        count: gpsPoints.length
    });
});
