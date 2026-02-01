import { GPSPointModel, IGPSPoint } from '../models/GPSPoint.model';
import { ClientSession } from 'mongoose';

export class GPSPointRepository {
  async bulkCreate(points: Partial<IGPSPoint>[], session?: ClientSession) {
    if (session) {
      return GPSPointModel.insertMany(points, { session });
    }
    return GPSPointModel.insertMany(points);
  }
}