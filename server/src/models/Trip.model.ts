import { Schema, model, Document, Types } from 'mongoose';

export interface ITrip extends Document {
  userId: Types.ObjectId;
  name: string;                
  startTime: Date;
  endTime: Date;
  totalDistance: number;       // meters
  totalIdlingTime: number;     // seconds
  totalStoppageTime: number;   // seconds
  createdAt: Date;
}

const TripSchema = new Schema<ITrip>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      default: 'Trip'
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    totalDistance: {
      type: Number,
      default: 0
    },
    totalIdlingTime: {
      type: Number,
      default: 0
    },
    totalStoppageTime: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const TripModel = model<ITrip>('Trip', TripSchema);
