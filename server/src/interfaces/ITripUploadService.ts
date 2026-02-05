import { ITrip } from '../models/Trip.model';

export interface ITripUploadService {
    uploadTrip(userId: string, fileBuffer: Buffer): Promise<{ trip: ITrip; pointsCount: number }>;
}
