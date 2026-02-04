import { Response } from 'express';
import { TripUploadService } from '../services/tripUpload.service';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { AuthRequest } from '../middleware/auth.middleware';
import { HTTP_STATUS, HTTP_MESSAGES } from '../constants/http.constants';
import { asyncHandler } from '../utils/asyncHandler';
import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  CSVValidationError
} from '../types/errors';

const service = new TripUploadService(
  new TripRepository(),
  new GPSPointRepository()
);

const tripRepo = new TripRepository();
const gpsRepo = new GPSPointRepository();

export const uploadTrip = asyncHandler(async (
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
    const result = await service.uploadTrip(
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
  } catch (error: any) {
    if (error.name === 'CSVValidationError') {
      throw new CSVValidationError(error.message);
    }

    if (error.message?.includes('Invalid file type')) {
      throw new BadRequestError(HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE);
    }

    throw new InternalServerError(HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP);
  }
});

export const getUserTrips = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.user) {
    throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
  }

  const trips = await tripRepo.findByUserId(req.user.userId);

  res.status(HTTP_STATUS.OK).json({
    trips,
    count: trips.length
  });
});

export const getTripById = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.user) {
    throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
  }

  const { id } = req.params;
  const trip = await tripRepo.findById(id as string);

  if (!trip) {
    throw new NotFoundError(HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
  }

  if (trip.userId.toString() !== req.user.userId) {
    throw new ForbiddenError(HTTP_MESSAGES.TRIP.ACCESS_DENIED);
  }

  res.status(HTTP_STATUS.OK).json(trip);
});

export const getTripGPSPoints = asyncHandler(async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.user) {
    throw new UnauthorizedError(HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED);
  }

  const { id } = req.params;

  const trip = await tripRepo.findById(id as string);
  if (!trip) {
    throw new NotFoundError(HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND);
  }

  if (trip.userId.toString() !== req.user.userId) {
    throw new ForbiddenError(HTTP_MESSAGES.TRIP.ACCESS_DENIED);
  }

  const gpsPoints = await gpsRepo.findByTripId(id as string);

  res.status(HTTP_STATUS.OK).json({
    gpsPoints,
    count: gpsPoints.length
  });
});
