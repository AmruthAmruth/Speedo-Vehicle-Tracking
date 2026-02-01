import { Schema, model, Document, Types } from 'mongoose';

export interface IGPSPoint extends Document {
  tripId: Types.ObjectId;
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: boolean;
  speed: number;   // km/h (calculated later)
}

const GPSPointSchema = new Schema<IGPSPoint>(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    ignition: {
      type: Boolean,
      required: true
    },
    speed: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: false
  }
);

export const GPSPointModel = model<IGPSPoint>(
  'GPSPoint',
  GPSPointSchema
);
