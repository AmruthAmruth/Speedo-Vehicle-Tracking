import { Request, Response } from 'express';
import { TripUploadService } from '../services/tripUpload.service';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { AuthRequest } from '../middleware/auth.middleware';
import { HTTP_STATUS, HTTP_MESSAGES } from '../constants/http.constants';

const service = new TripUploadService(
  new TripRepository(),
  new GPSPointRepository()
);

const tripRepo = new TripRepository();
const gpsRepo = new GPSPointRepository();

export const uploadTrip = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
    }

    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: HTTP_MESSAGES.TRIP.NO_FILE_UPLOADED });
    }

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
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: HTTP_MESSAGES.TRIP.CSV_VALIDATION_FAILED,
        error: error.message
      });
    }

    if (error.message?.includes('Invalid file type')) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: HTTP_MESSAGES.TRIP.INVALID_FILE_TYPE,
        error: error.message
      });
    }

    // Generic error
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTP_MESSAGES.TRIP.FAILED_TO_UPLOAD_TRIP,
      error: error.message
    });
  }
};

export const getUserTrips = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
    }

    const trips = await tripRepo.findByUserId(req.user.userId);

    res.status(HTTP_STATUS.OK).json({
      trips,
      count: trips.length
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_TRIPS,
      error: error.message
    });
  }
};

export const getTripById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
    }

    const { id } = req.params;
    const trip = await tripRepo.findById(id as string);

    if (!trip) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND });
    }


    if (trip.userId.toString() !== req.user.userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: HTTP_MESSAGES.TRIP.ACCESS_DENIED });
    }

    res.status(HTTP_STATUS.OK).json(trip);
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_TRIP,
      error: error.message
    });
  }
};

export const getTripGPSPoints = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: HTTP_MESSAGES.AUTH.USER_NOT_AUTHENTICATED });
    }

    const { id } = req.params;


    const trip = await tripRepo.findById(id as string);
    if (!trip) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: HTTP_MESSAGES.TRIP.TRIP_NOT_FOUND });
    }

    if (trip.userId.toString() !== req.user.userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: HTTP_MESSAGES.TRIP.ACCESS_DENIED });
    }


    const gpsPoints = await gpsRepo.findByTripId(id as string);

    res.status(HTTP_STATUS.OK).json({
      gpsPoints,
      count: gpsPoints.length
    });
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTP_MESSAGES.TRIP.FAILED_TO_FETCH_GPS_POINTS,
      error: error.message
    });
  }
};
