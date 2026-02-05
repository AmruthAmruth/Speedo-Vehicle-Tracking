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
exports.TripController = void 0;
const tripUpload_service_1 = require("../services/tripUpload.service");
const http_constants_1 = require("../constants/http.constants");
const asyncHandler_1 = require("../utils/asyncHandler");
const errors_1 = require("../types/errors");
const tsyringe_1 = require("tsyringe");
let TripController = class TripController {
    constructor(service, tripRepo, gpsRepo) {
        this.service = service;
        this.tripRepo = tripRepo;
        this.gpsRepo = gpsRepo;
        this.uploadTrip = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            if (!req.file) {
                throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED);
            }
            try {
                const result = await this.service.uploadTrip(req.user.userId, req.file.buffer);
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
        this.getUserTrips = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const trips = await this.tripRepo.findByUserId(req.user.userId);
            res.status(http_constants_1.HTTP_STATUS.OK).json({
                trips,
                count: trips.length
            });
        });
        this.getTripById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const { id } = req.params;
            const trip = await this.tripRepo.findById(id);
            if (!trip) {
                throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
            }
            if (trip.userId.toString() !== req.user.userId) {
                throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
            }
            res.status(http_constants_1.HTTP_STATUS.OK).json(trip);
        });
        this.getTripGPSPoints = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const { id } = req.params;
            const trip = await this.tripRepo.findById(id);
            if (!trip) {
                throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
            }
            if (trip.userId.toString() !== req.user.userId) {
                throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
            }
            const gpsPoints = await this.gpsRepo.findByTripId(id);
            res.status(http_constants_1.HTTP_STATUS.OK).json({
                gpsPoints,
                count: gpsPoints.length
            });
        });
    }
};
exports.TripController = TripController;
exports.TripController = TripController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(1, (0, tsyringe_1.inject)('ITripRepository')),
    __param(2, (0, tsyringe_1.inject)('IGPSPointRepository')),
    __metadata("design:paramtypes", [tripUpload_service_1.TripUploadService, Object, Object])
], TripController);
