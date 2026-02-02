import { Request, Response } from 'express';
import { TripUploadService } from '../services/tripUpload.service';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { AuthRequest } from '../middleware/auth.middleware';

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
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await service.uploadTrip(
      req.user.userId,
      req.file.buffer
    );

    res.status(201).json({
      message: 'Trip uploaded successfully',
      tripId: result.trip._id,
      startTime: result.trip.startTime,
      endTime: result.trip.endTime,
      gpsPointsProcessed: result.pointsCount
    });
  } catch (error: any) {
    // Categorize errors for better client feedback
    if (error.name === 'CSVValidationError') {
      return res.status(400).json({
        message: 'CSV validation failed',
        error: error.message
      });
    }

    if (error.message?.includes('Invalid file type')) {
      return res.status(400).json({
        message: 'Invalid file type',
        error: error.message
      });
    }

    // Generic error
    res.status(500).json({
      message: 'Failed to upload trip',
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
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const trips = await tripRepo.findByUserId(req.user.userId);

    res.status(200).json({
      trips,
      count: trips.length
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch trips',
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
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.params;
    const trip = await tripRepo.findById(id as string);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Verify trip belongs to user
    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(trip);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch trip',
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
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id } = req.params;

    // Verify trip exists and belongs to user
    const trip = await tripRepo.findById(id as string);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get GPS points
    const gpsPoints = await gpsRepo.findByTripId(id as string);

    res.status(200).json({
      gpsPoints,
      count: gpsPoints.length
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch GPS points',
      error: error.message
    });
  }
};
