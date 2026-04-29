import { Response } from 'express';
import { ITripUploadService } from '../interfaces/ITripUploadService';
import { ITripRepository } from '../interfaces/ITripRepository';
import { IGPSPointRepository } from '../interfaces/IGPSPointRepository';
import { AuthRequest } from '../middleware/auth.middleware';
import { HTTP_STATUS, HTTP_MESSAGES } from '../shared/constants/http.constants';
import { asyncHandler } from '../shared/utils/asyncHandler';
import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  CSVValidationError
} from '../shared/types/errors';
import { injectable, inject } from 'tsyringe';

import { SimulationService } from '../services/simulation.service';

@injectable()
export class TripController {
  constructor(
    @inject('ITripUploadService') private _service: ITripUploadService,
    @inject('ITripRepository') private _tripRepo: ITripRepository,
    @inject('IGPSPointRepository') private _gpsRepo: IGPSPointRepository,
    @inject('SimulationService') private _simulationService: SimulationService
  ) { }

  startSimulation = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    const { id } = req.params;
    
    // Start simulation in background
    this._simulationService.startSimulation(id as string);

    res.status(HTTP_STATUS.OK).json({
      message: 'Simulation started successfully'
    });
  });

  stopSimulation = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    const { id } = req.params;
    
    this._simulationService.stopSimulation(id as string);

    res.status(HTTP_STATUS.OK).json({
      message: 'Simulation stopped successfully'
    });
  });

  uploadTrip = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }

    if (!req.file) {
      throw new BadRequestError(HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED);
    }

    try {
      const result = await this._service.uploadTrip(
        req.user.userId,
        req.file.buffer
      );

      res.status(HTTP_STATUS.CREATED).json({
        message: HTTP_MESSAGES.TRIP.TRIP_UPLOADED_SUCCESSFULLY,
        tripId: result.trip._id,
        startTime: result.trip.startTime,
        endTime: result.trip.endTime,
        gpsPointsProcessed: result.pointsCount
      });
    } catch (error) {
      if (error instanceof CSVValidationError) {
        throw new CSVValidationError(error.message);
      }

      if (error instanceof Error && error.message?.includes('Invalid file type')) {
        throw new BadRequestError(HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE);
      }

      throw new InternalServerError(HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP);
    }
  });

  getUserTrips = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }

    const trips = await this._tripRepo.findByUserId(req.user.userId);

    res.status(HTTP_STATUS.OK).json({
      trips,
      count: trips.length
    });
  });

  getTripById = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }

    const { id } = req.params;
    const trip = await this._tripRepo.findById(id as string);

    if (!trip) {
      throw new NotFoundError(HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
    }

    if (trip.userId.toString() !== req.user.userId) {
      throw new ForbiddenError(HTTP_MESSAGES.TRIP.ACCESS_DENIED);
    }

    res.status(HTTP_STATUS.OK).json(trip);
  });

  getTripGPSPoints = asyncHandler(async (
    req: AuthRequest,
    res: Response
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
    }

    const { id } = req.params;

    const trip = await this._tripRepo.findById(id as string);
    if (!trip) {
      throw new NotFoundError(HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
    }

    if (trip.userId.toString() !== req.user.userId) {
      throw new ForbiddenError(HTTP_MESSAGES.TRIP.ACCESS_DENIED);
    }

    const gpsPoints = await this._gpsRepo.findByTripId(id as string);

    res.status(HTTP_STATUS.OK).json({
      gpsPoints,
      count: gpsPoints.length
    });
  });
}
