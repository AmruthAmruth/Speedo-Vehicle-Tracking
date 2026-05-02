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
const http_constants_1 = require("../shared/constants/http.constants");
const asyncHandler_1 = require("../shared/utils/asyncHandler");
const errors_1 = require("../shared/types/errors");
const tsyringe_1 = require("tsyringe");
const simulation_service_1 = require("../services/simulation.service");
let TripController = class TripController {
    constructor(_service, _tripRepo, _gpsRepo, _simulationService) {
        this._service = _service;
        this._tripRepo = _tripRepo;
        this._gpsRepo = _gpsRepo;
        this._simulationService = _simulationService;
        this.startLiveTrip = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const { name } = req.body;
            const trip = await this._tripRepo.create({
                userId: req.user.userId,
                name: name || `Live Trip ${new Date().toLocaleString()}`,
                startTime: new Date(),
                isActive: true
            });
            res.status(http_constants_1.HTTP_STATUS.CREATED).json({
                message: 'Live trip started successfully',
                trip
            });
        });
        this.stopLiveTrip = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const { id } = req.params;
            const trip = await this._tripRepo.findById(id);
            if (!trip) {
                throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
            }
            if (trip.userId.toString() !== req.user.userId) {
                throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
            }
            const updatedTrip = await this._tripRepo.update(id, {
                isActive: false,
                endTime: new Date()
            });
            res.status(http_constants_1.HTTP_STATUS.OK).json({
                message: 'Live trip stopped successfully',
                trip: updatedTrip
            });
        });
        this.startSimulation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            // Start simulation in background
            this._simulationService.startSimulation(id);
            res.status(http_constants_1.HTTP_STATUS.OK).json({
                message: 'Simulation started successfully'
            });
        });
        this.stopSimulation = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            this._simulationService.stopSimulation(id);
            res.status(http_constants_1.HTTP_STATUS.OK).json({
                message: 'Simulation stopped successfully'
            });
        });
        this.uploadTrip = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            if (!req.file) {
                throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED);
            }
            try {
                const result = await this._service.uploadTrip(req.user.userId, req.file.buffer);
                res.status(http_constants_1.HTTP_STATUS.CREATED).json({
                    message: http_constants_1.HTTP_MESSAGES.TRIP.TRIP_UPLOADED_SUCCESSFULLY,
                    tripId: result.trip._id,
                    startTime: result.trip.startTime,
                    endTime: result.trip.endTime,
                    gpsPointsProcessed: result.pointsCount
                });
            }
            catch (error) {
                if (error instanceof errors_1.CSVValidationError) {
                    throw new errors_1.CSVValidationError(error.message);
                }
                if (error instanceof Error && error.message?.includes('Invalid file type')) {
                    throw new errors_1.BadRequestError(http_constants_1.HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE);
                }
                throw new errors_1.InternalServerError(http_constants_1.HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP);
            }
        });
        this.getUserTrips = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            if (!req.user) {
                throw new errors_1.UnauthorizedError(http_constants_1.HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
            }
            const trips = await this._tripRepo.findByUserId(req.user.userId);
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
            const trip = await this._tripRepo.findById(id);
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
            const trip = await this._tripRepo.findById(id);
            if (!trip) {
                throw new errors_1.NotFoundError(http_constants_1.HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
            }
            if (trip.userId.toString() !== req.user.userId) {
                throw new errors_1.ForbiddenError(http_constants_1.HTTP_MESSAGES.TRIP.ACCESS_DENIED);
            }
            const gpsPoints = await this._gpsRepo.findByTripId(id);
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
    __param(0, (0, tsyringe_1.inject)('ITripUploadService')),
    __param(1, (0, tsyringe_1.inject)('ITripRepository')),
    __param(2, (0, tsyringe_1.inject)('IGPSPointRepository')),
    __param(3, (0, tsyringe_1.inject)('SimulationService')),
    __metadata("design:paramtypes", [Object, Object, Object, simulation_service_1.SimulationService])
], TripController);
