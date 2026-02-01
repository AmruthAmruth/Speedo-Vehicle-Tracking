import { Request, Response } from 'express';
import { TripUploadService } from '../services/tripUpload.service';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { AuthRequest } from '../middleware/auth.middleware';

const service = new TripUploadService(
  new TripRepository(),
  new GPSPointRepository()
);

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
