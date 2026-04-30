export interface IGPSQueueService {
    addGPSJob(tripId: string, gpsPoint: any): Promise<void>;
}
