import { TripModel, ITrip } from '../models/Trip.model';
import { ClientSession } from 'mongoose';

export class TripRepository {
  async create(data: Partial<ITrip>, session?: ClientSession) {
    if (session) {
      return TripModel.create([data], { session }).then(trips => trips[0]);
    }
    return TripModel.create(data);
  }

  async findByUserId(userId: string) {
    return TripModel.find({ userId })
      .sort({ startTime: -1 })
      .lean();
  }

  async findById(id: string) {
    return TripModel.findById(id).lean();
  }
}