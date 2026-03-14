import { ICsvService } from '../interfaces/ICsvService';
import { ITripUploadService } from '../interfaces/ITripUploadService';
import { ITripRepository } from '../interfaces/ITripRepository';
import { IGPSPointRepository } from '../interfaces/IGPSPointRepository';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { getDistance } from 'geolib';
import { HTTP_MESSAGES } from '../shared/constants/http.constants';
import { injectable, inject } from 'tsyringe';

@injectable()
export class TripUploadService implements ITripUploadService {
  constructor(
    @inject('ITripRepository') private _tripRepo: ITripRepository,
    @inject('IGPSPointRepository') private _gpsRepo: IGPSPointRepository,
    @inject('ICsvService') private _csvService: ICsvService
  ) { }

  async uploadTrip(
    userId: string,
    fileBuffer: Buffer
  ) {
     
    const rows = await this._csvService.parseCSV(fileBuffer);

     
    const MIN_GPS_POINTS = 2;
    if (rows.length < MIN_GPS_POINTS) {
      throw new Error(
        HTTP_MESSAGES.GENERIC.INSUFFICIENT_GPS_POINTS(MIN_GPS_POINTS, rows.length)
      );
    }

     
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
       
      const trip = await this._tripRepo.create({
        userId: new Types.ObjectId(userId),
        startTime: new Date(rows[0].timestamp),
        endTime: new Date(rows[rows.length - 1].timestamp)
      }, session);

       
      const gpsPoints = rows.map(row => ({
        tripId: trip._id,
        latitude: row.latitude,
        longitude: row.longitude,
        timestamp: new Date(row.timestamp),
        ignition: row.ignition === 'ON',
        speed: 0  
      }));

       
      for (let i = 1; i < gpsPoints.length; i++) {
        const prev = gpsPoints[i - 1];
        const curr = gpsPoints[i];

         
        const distance = getDistance(
          { latitude: prev.latitude, longitude: prev.longitude },
          { latitude: curr.latitude, longitude: curr.longitude }
        );

         
        const timeDiff = (curr.timestamp.getTime() - prev.timestamp.getTime()) / 1000;

         
        if (timeDiff > 0) {
          curr.speed = (distance / timeDiff) * 3.6;
        } else {
           
          curr.speed = 0;
        }
      }
       

       
      await this._gpsRepo.bulkCreate(gpsPoints, session);

       
      await session.commitTransaction();

      return {
        trip,
        pointsCount: gpsPoints.length
      };
    } catch (error) {
       
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
