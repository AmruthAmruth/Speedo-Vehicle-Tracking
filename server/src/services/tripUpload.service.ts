import { parseCSV } from './csv.service';
import { TripRepository } from '../repositories/trip.repository';
import { GPSPointRepository } from '../repositories/gpspoint.repository';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

export class TripUploadService {
  constructor(
    private _tripRepo: TripRepository,
    private _gpsRepo: GPSPointRepository
  ) { }

  async uploadTrip(
    userId: string,
    fileBuffer: Buffer
  ) {
    // 1. Parse CSV
    const rows = await parseCSV(fileBuffer);

    // 2. Validate minimum GPS points
    const MIN_GPS_POINTS = 2;
    if (rows.length < MIN_GPS_POINTS) {
      throw new Error(
        `Insufficient GPS points. At least ${MIN_GPS_POINTS} points are required, but only ${rows.length} found.`
      );
    }

    // 3. Start a transaction session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 4. Create Trip
      const trip = await this._tripRepo.create({
        userId: new Types.ObjectId(userId),
        startTime: new Date(rows[0].timestamp),
        endTime: new Date(rows[rows.length - 1].timestamp)
      }, session);

      // 5. Save GPS Points
      const gpsPoints = rows.map(row => ({
        tripId: trip._id,
        latitude: row.latitude,
        longitude: row.longitude,
        timestamp: new Date(row.timestamp),
        ignition: row.ignition === 'ON'
      }));

      await this._gpsRepo.bulkCreate(gpsPoints, session);

      // 6. Commit transaction
      await session.commitTransaction();

      return {
        trip,
        pointsCount: gpsPoints.length
      };
    } catch (error) {
      // Rollback transaction on error
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
