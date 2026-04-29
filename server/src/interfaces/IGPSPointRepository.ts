import { IGPSPoint } from '../models/GPSPoint.model';
import { ClientSession } from 'mongoose';

export interface IGPSPointRepository {
    bulkCreate(points: Partial<IGPSPoint>[], session?: ClientSession): Promise<IGPSPoint[]>;
    findByTripId(tripId: string): Promise<IGPSPoint[]>;
}
  